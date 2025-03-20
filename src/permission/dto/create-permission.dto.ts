import { IsEnum } from "class-validator";
import { PermissionEnum } from "src/enum";

export class CreatePermissionDto {
    @IsEnum(PermissionEnum)
    permission:PermissionEnum;
}
