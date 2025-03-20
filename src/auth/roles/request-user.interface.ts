import { PermissionEnum, Role } from "src/enum";


export interface RequestWithUser extends Request{
    user: {
        id:number;
        email:string;
        role:Role;
        
    };
}