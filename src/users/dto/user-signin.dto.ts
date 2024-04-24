import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class UserSignInDTO {
    @IsNotEmpty({ message: "Email can not be empty!" })
    @IsEmail({}, { message: "Please provide a valid email !" })
    email: string

    @IsNotEmpty({ message: "Password can not be empty!" })
    @MinLength(5, { message: "Password must be of minimim 5 character in length !" })
    password: string
}