import { ClassEntity } from "src/classes/entities/class.entity";
import { Role, SubSchoolStatus } from "src/enum";
import { MainSchool } from "src/main-school/entities/main-school.entity";
import { RoleRequest } from "src/role-request/entities/role-request.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class SubSchool extends User{
    

    @Column({unique:true})
    name:string;

    @Column()
    address:string;

    @Column({
        type: 'enum',
        enum: SubSchoolStatus,
        default:SubSchoolStatus.ACTIVE,
    })
    status:SubSchoolStatus;
   

    
    @ManyToOne(()=>MainSchool, (mainSchool)=>mainSchool.subSchools,{onDelete: 'CASCADE'})
    mainSchool:MainSchool

    @OneToMany(()=>ClassEntity, (classEntity)=>classEntity.subSchool)
    classes:ClassEntity[];

    @OneToMany(()=> RoleRequest,(roleRequest) => roleRequest.subSchool)
    roleRequest: RoleRequest[]
    


    


}
