import { ApprovalStatus, Role } from "src/enum";
import { MainSchool } from "src/main-school/entities/main-school.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { SubSchool } from "src/sub-school/entities/sub-school.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleRequest {
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(() => SubSchool, {nullable:true})
    subSchool?:SubSchool;
    
    @ManyToOne(() => Staff, {nullable:true})
    staff?:Staff;

    @Column({type:'enum', enum:Role})
    requestedRole:Role;

    @Column({type:'enum',enum:ApprovalStatus,default:ApprovalStatus.PENDING})
    status:ApprovalStatus;
}
