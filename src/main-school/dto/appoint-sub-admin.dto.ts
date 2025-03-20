import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/enum";


export class AppointSubAdminDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsEnum(Role, {message:'Role must be SUB_ADMIN'})
    role:Role;

    subSchoolId:number;
}