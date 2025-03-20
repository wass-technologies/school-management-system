
import { Role } from "src/enum";
import { Staff } from "src/staff/entities/staff.entity";
import { SubSchool } from "src/sub-school/entities/sub-school.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MainSchool extends User{
 
    @Column()
    name:string;
    @Column()
    address:string;
    
    @Column({type:'enum', enum:Role,default:Role.MAIN_ADMIN})
    role:Role;
    
    @OneToMany(() => SubSchool, (subSchool) => subSchool.mainSchool)
    subSchools:SubSchool[];

    @OneToMany(() => Staff, (staff) => staff.mainSchool)
    staff:Staff[];



    

}
