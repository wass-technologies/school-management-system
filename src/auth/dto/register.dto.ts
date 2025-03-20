import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { ApprovalStatus, Role } from "src/enum";


export class RegisterDto{
    @IsNotEmpty()
    name:string;
    
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

   
}