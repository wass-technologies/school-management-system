import { Module } from '@nestjs/common';
import { SubSchoolService } from './sub-school.service';
import { SubSchoolController } from './sub-school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainSchool } from 'src/main-school/entities/main-school.entity';
import { ClassEntity } from 'src/classes/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { SubSchool } from './entities/sub-school.entity';


@Module({
  imports:[TypeOrmModule.forFeature([SubSchool, ClassEntity,Student])],
  controllers: [SubSchoolController],
  providers: [SubSchoolService],
})
export class SubSchoolModule {}
