import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './strategy/jwt.strategy';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { MainSchool } from 'src/main-school/entities/main-school.entity';
import { SubSchoolService } from 'src/sub-school/sub-school.service';
import { MainSchoolService } from 'src/main-school/main-school.service';
import { Student } from 'src/student/entities/student.entity';
import { ClassEntity } from 'src/classes/entities/class.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { RoleRequest } from 'src/role-request/entities/role-request.entity';
import { User } from 'src/user/entities/user.entity';
import { UserPermission } from 'src/user-permission/entities/user-permission.entity';






@Module({

  imports:[TypeOrmModule.forFeature([SubSchool, MainSchool,Student,ClassEntity,Staff,RoleRequest,User]), JwtModule.register({
  secretOrPrivateKey:process.env.JWT_SECRET_KEY || 'asdreqwdftgfdsawkhjfdasvvb',
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,SubSchoolService,MainSchoolService],
})
export class AuthModule {}
