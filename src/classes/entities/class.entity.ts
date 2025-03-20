import { Student } from "src/student/entities/student.entity";
import { SubSchool } from "src/sub-school/entities/sub-school.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClassEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @ManyToOne(()=>SubSchool,(subSchool)=>subSchool.classes)
    subSchool:SubSchool;


    @OneToMany(()=>Student,(student)=>student.class)
    students:Student[]
}
