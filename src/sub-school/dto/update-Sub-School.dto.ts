import { IsOptional, IsString } from "class-validator";

export class UpdateSubSchoolDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    address?:string;
}