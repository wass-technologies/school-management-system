import { Module } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionController } from './user-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { UserPermission } from './entities/user-permission.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { MainSchool } from 'src/main-school/entities/main-school.entity';
import { Permission } from 'src/permission/entities/permission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserPermission,Staff,Permission])],
  controllers: [UserPermissionController],
  providers: [UserPermissionService],
})
export class UserPermissionModule {}
