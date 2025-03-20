import { Role } from "src/enum";
import { MainSchool } from "src/main-school/entities/main-school.entity";
import { RoleRequest } from "src/role-request/entities/role-request.entity";
import { UserPermission } from "src/user-permission/entities/user-permission.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Staff extends User{

    @Column()
    name: string;

    @Column()
    address:string;

    @Column({type:'enum', enum:Role,default:Role.STAFF})
    role:Role;

    @ManyToOne(()=>MainSchool, (mainSchool)=>mainSchool.staff,{onDelete: 'CASCADE'})
    mainSchool:MainSchool

    @OneToMany(()=> RoleRequest,(roleRequest) => roleRequest.staff)
    roleRequest: RoleRequest[]
    
    @OneToMany(() => UserPermission,(userPermission)=> userPermission.staff)
    userPermissions:UserPermission[];



}
