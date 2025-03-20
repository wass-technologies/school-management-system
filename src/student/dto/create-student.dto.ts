import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsInt()
    @Min(3)
    @Max(20)
    age:number;
    
}
