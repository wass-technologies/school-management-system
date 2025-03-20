import { ClassEntity } from "src/classes/entities/class.entity";
import { SubSchool } from "src/sub-school/entities/sub-school.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name: string;
    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    address: string;
    @Column()
    phoneNo: string;



    @ManyToOne(()=>ClassEntity, (classEntity)=>classEntity.students)
    class:ClassEntity;
    
}
