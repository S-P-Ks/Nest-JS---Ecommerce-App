import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty({ message: "Title can not be empty!" })
    @IsString()
    title: string

    @IsNotEmpty({ message: "Description can not be empty!" })
    @IsString()
    description: string

    @IsNotEmpty({ message: "Price can not be empty!" })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "Price should be number and max precision is 2!" })
    @IsPositive({ message: "Price should be greater than 0" })
    price: number

    @IsNotEmpty({ message: "Stock can not be empty!" })
    @IsNumber({}, { message: "Stock should be number!" })
    @Min(0, { message: "Stock should not be less than 0!" })
    stock: number

    @IsNotEmpty({ message: "Images can not be empty!" })
    @IsArray({ message: "Images should be in array format!" })
    images: string[]

    @IsNotEmpty({ message: "Category can not be empty!" })
    @IsNumber({}, { message: "Category should be number!" })
    categoryId: number
}
