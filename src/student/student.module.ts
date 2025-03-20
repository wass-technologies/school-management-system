import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { ClassEntity } from 'src/classes/entities/class.entity';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student, ClassEntity, SubSchool])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
