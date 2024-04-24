import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { UserSignInDTO } from "./user-signin.dto"

export class UserSignUpDTO extends UserSignInDTO {
    @IsNotEmpty({ message: "Name can not be empty!" })
    @IsString({ message: "Name should be string only !" })
    name: string

}