import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserSignUpDTO } from "./dto/user-signup.dto";
import { hash, compare } from "bcrypt";
import { UserSignInDTO } from "./dto/user-signin.dto";
import { sign } from "jsonwebtoken";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) { }

    async signup(body: UserSignUpDTO): Promise<UserEntity> {
        body.password = await hash(body.password, 10);
        let user = this.usersRepository.create(body);


        user = await this.usersRepository.save(user)

        delete user.password;

        return user;
    }

    async signIn(userSignInDto: UserSignInDTO): Promise<UserEntity> {
        const userExists = await this.usersRepository.createQueryBuilder("users").addSelect("users.password").where("users.email=:email", { email: userSignInDto.email }).getOne()
        if (!userExists) throw new BadRequestException("Bad Credentials")

        const matchPassword = await compare(userSignInDto.password, userExists.password)

        if (!matchPassword) throw new BadRequestException("Bad Credentials")

        return userExists
    }

    async findUserByEmail(email: string) {
        return await this.usersRepository.findOneBy({ email })
    }

    async accessToken(user: UserEntity): Promise<string> {
        return sign({
            id: user.id,
            email: user.email
        }, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME
        })
    }

    async findAll() {
        return await this.usersRepository.find()
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.usersRepository.findOneBy({ id })
        if (!user) throw new NotFoundException("User not found!")
        return user
    }
}