import { IsEmail, IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";
import { IsEnum } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    @IsEnum(["ADMIN", "INTERN", "ENGINEER"], {
        message: "Role must be ADMIN, INTERN or ENGINEER"
    })
    role: "ADMIN" | "INTERN" | "ENGINEER";
}