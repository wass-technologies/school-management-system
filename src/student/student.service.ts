import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Like, Not, Repository } from 'typeorm';
import { ClassEntity } from 'src/classes/entities/class.entity';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { SubSchoolStatus } from 'src/enum';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository (Student) private readonly studentRepository: Repository<Student>,
    @InjectRepository (ClassEntity) private readonly classRepository: Repository<ClassEntity>,
    @InjectRepository(SubSchool) private readonly subSchoolRepository: Repository<SubSchool>,
  ){}

  async addStudent(subSchoolId:number,classId:number, dto:CreateStudentDto, subAdmin:number ) {
    const subSchool = await this.subSchoolRepository.findOne({where:{id: subSchoolId},
    });
    if(!subSchool){
      throw new NotFoundException('Sub School not found');
    }
    if(subSchool.id != subAdmin){
      throw new NotFoundException('You are not authorized to add student');

    }
    if (subSchool.status === SubSchoolStatus.INACTIVE){
      throw new ForbiddenException('School is not Active');
    }
    const classEntity = await this.classRepository.findOne({where:{id: classId, subSchool:{id:subSchoolId}},
    relations:['subSchool']});

    if(!classEntity){
      throw new NotFoundException('Class not found');
    }

    const newstudent = this.studentRepository.create(
      
      {
        ...dto,class:classEntity,
       
      }
    )

    return await this.studentRepository.save(newstudent);
  }

  async updateStudent(subSchoolId:number,classId:number, dto:UpdateStudentDto,id: number, subAdmin:number ) {
    const subSchool = await this.subSchoolRepository.findOne({where:{id: subSchoolId},
    });
    if(!subSchool){
      throw new NotFoundException('Sub School not found');
    }
    if(subSchool.id != subAdmin){
      throw new NotFoundException('You are not authorized');

    }
    if (subSchool.status === SubSchoolStatus.INACTIVE){
      throw new ForbiddenException('School is not Active');
    }
    const classEntity = await this.classRepository.findOne({where:{id: classId, subSchool:{id:subSchoolId}},
    relations:['subSchool']});

    if(!classEntity){
      throw new NotFoundException('Class not found');
    }

    const student = await this.studentRepository.findOne({
      where: { id:id, class: { id: classId } },
      relations: ['class'],
    });
  
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    
  if (dto.age) student.age = dto.age;
  if (dto.gender) student.gender = dto.gender;
  if (dto.address) student.address = dto.address;
  if (dto.phoneNo ) student.phoneNo = dto.phoneNo;


    

    return await this.studentRepository.save(student);
  }






   // Get student by ID
   async getStudentById(id: number,subSchoolId:number,subAdmin:number) {

    const subSchool = await this.subSchoolRepository.findOne({where:{id: subSchoolId},
    });
    if(!subSchool){
      throw new NotFoundException('Sub School not found');
    }
    if(subSchool.id != subAdmin){
      throw new NotFoundException('You are not authorized to add student');

    }
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  // Search students by name 
  async searchStudentsByName(name: string,subSchoolId:number,subAdmin:number) {

    const subSchool = await this.subSchoolRepository.findOne({where:{id: subSchoolId},
    });
    if(!subSchool){
      throw new NotFoundException('Sub School not found');
    }
    if(subSchool.id != subAdmin){
      throw new NotFoundException('You are not authorized to add student');

    }
    const students = await this.studentRepository.find({
      where: { name: Like(`%${name}%`) },
    });
    if (!students || students.length === 0) {
      throw new NotFoundException('No students found with that name');
    }
    return students;
  }

  // Get students by class ID
  async getStudentsByClassId(classId: number,subSchoolId:number,subAdmin:number) {
    const subSchool = await this.subSchoolRepository.findOne({where:{id: subSchoolId},
    });
    if(!subSchool){
      throw new NotFoundException('Sub School not found');
    }
    if(subSchool.id != subAdmin){
      throw new NotFoundException('You are not authorized to add student');

    }
    const students = await this.studentRepository.find({
      where: { class: { id: classId } },
      relations: ['class'],
    });
    if (!students || students.length === 0) {
      throw new NotFoundException('No students found for this class');
    }
    return students;
  }

  // Get students by age
  async getStudentsByAge(age: number,subSchoolId:number,subAdmin:number) {
    const subSchool = await this.subSchoolRepository.findOne({where:{id: subSchoolId},
    });
    if(!subSchool){
      throw new NotFoundException('Sub School not found');
    }
    if(subSchool.id != subAdmin){
      throw new NotFoundException('You are not authorized to add student');

    }
    const students = await this.studentRepository.find({ where: { age } });
    if (!students || students.length === 0) {
      throw new NotFoundException('No students found with that age');
    }
    return students;
  }




}
