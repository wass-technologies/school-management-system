import { ApprovalStatus, PermissionEnum, Role } from "src/enum";
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity()
@TableInheritance({column:{type:'varchar',name:'type'}})
export abstract class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({type:'enum',enum:ApprovalStatus, default:ApprovalStatus.PENDING})
    approvalStatus: ApprovalStatus;

}
