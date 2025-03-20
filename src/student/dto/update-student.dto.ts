import { IsIn, IsInt, IsOptional, IsString } from "class-validator";


export class UpdateStudentDto  {
  
    @IsOptional()
    @IsInt()
    age?: number;
  
    @IsOptional()
    @IsString()
    gender?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsString()
    phoneNo?: string;
  
    @IsOptional()
    classId?: number;

}
