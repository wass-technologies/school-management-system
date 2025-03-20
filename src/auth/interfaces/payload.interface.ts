import { Role } from "src/enum";


export interface JwtPayload{
    id:number;
    email:string;
    role:Role;
}