import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { SubSchoolStatus } from "src/enum";


export class CreateSubSchoolDto {

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    password:string;

    @IsNotEmpty()
    @IsString()
    name:string

    @IsString()
    address:string;

    @IsOptional()
    @IsEnum(SubSchoolStatus)
    status?: SubSchoolStatus;
}
