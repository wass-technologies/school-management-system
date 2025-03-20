import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { PermissionEnum } from "src/enum";

export class CreateUserPermissionDto {

   @IsEnum(PermissionEnum,{message:'invalid permission'})
    permission:PermissionEnum;

    @IsNumber()
    staffId:number;
    
}
