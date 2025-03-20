import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubSchool } from './entities/sub-school.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { ClassEntity } from 'src/classes/entities/class.entity';
import { CreateClassDto } from 'src/classes/dto/create-class.dto';


@Injectable()
export class SubSchoolService {
    constructor(
        @InjectRepository(SubSchool) private readonly subSchoolRepo:Repository<SubSchool>,
        @InjectRepository(Student) private readonly studentRepo:Repository<Student>,
        @InjectRepository(ClassEntity) private readonly classEntityRepo:Repository<ClassEntity>,
    ){}

  
//Add Class
   

    }
    




