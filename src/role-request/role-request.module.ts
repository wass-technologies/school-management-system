import { Module } from '@nestjs/common';
import { RoleRequestService } from './role-request.service';
import { RoleRequestController } from './role-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRequest } from './entities/role-request.entity';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { Staff } from 'src/staff/entities/staff.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RoleRequest,SubSchool,Staff])],
  controllers: [RoleRequestController],
  providers: [RoleRequestService],
})
export class RoleRequestModule {}
