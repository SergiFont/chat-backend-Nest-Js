import { IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    username: string;
}
