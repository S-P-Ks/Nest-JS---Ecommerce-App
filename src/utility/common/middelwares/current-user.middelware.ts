import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeaders = req.headers.authorization || req.headers.Authorization;
        if (!authHeaders || isArray(authHeaders) || !authHeaders.startsWith("Bearer ")) {
            req.currentUser = null;
        } else {
            try {
                const token = authHeaders.split(" ")[1]
                const { id } = <JwtPayload>verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
                const currentuser = await this.userService.findOne(+id)
                req.currentUser = currentuser
                next()
            } catch (error) {
                req.currentUser = null
                next()
            }

        }
        next();
    }
}
interface JWTPayload {
    id: string
}