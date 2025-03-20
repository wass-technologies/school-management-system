import { Module } from '@nestjs/common';
import { MainSchoolService } from './main-school.service';
import { MainSchoolController } from './main-school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainSchool } from './entities/main-school.entity';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { UserPermission } from 'src/user-permission/entities/user-permission.entity';


@Module({
  imports:[TypeOrmModule.forFeature([MainSchool, SubSchool,UserPermission])],
  controllers: [MainSchoolController],
  providers: [MainSchoolService],
})
export class MainSchoolModule {}
