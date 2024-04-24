import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserSignUpDTO } from "./dto/user-signup.dto";
import { UserEntity } from "./entities/user.entity";
import { hash } from "bcrypt"
import { UserSignInDTO } from "./dto/user-signin.dto";
import { config } from "dotenv"
import { CurrentUser } from "src/utility/decorators/current-user.decorator";
import { AuthenticationGuard } from "src/utility/guards/authentication.guards";
import { AuthorizeRoles } from "src/utility/decorators/authorizeRoles.decorator";
import { Roles } from "src/utility/common/user-roles.enum";
import { AuthorizeGuard } from "src/utility/guards/authorization.guard";

config()

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("signup")
    async signup(@Body() body: UserSignUpDTO): Promise<UserEntity> {
        const userExist = await this.userService.findUserByEmail(body.email)

        if (userExist) {
            throw new BadRequestException("User with email already exist !")
        }

        return await this.userService.signup(body)
    }

    @Post("signin")
    async signin(@Body() userSignInDto: UserSignInDTO): Promise<{
        accessToken: string;
        user: UserEntity;
    }> {
        const user = await this.userService.signIn(userSignInDto)
        const accessToken = await this.userService.accessToken(user)

        return { accessToken, user }
    }

    @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
    @Get("all")
    async findAll() {
        return await this.userService.findAll()
    }

    @Get(":id")
    async findOne(@Param() id: number) {
        return await this.userService.findOne(id)
    }

    @UseGuards(AuthenticationGuard)
    @Get("me")
    getProfile(@CurrentUser() currentUser: UserEntity) {
        return currentUser
    }
}