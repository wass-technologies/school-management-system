import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { In, Repository } from 'typeorm';
import { UserPermission } from './entities/user-permission.entity';
import { MainSchool } from 'src/main-school/entities/main-school.entity';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { Staff } from 'src/staff/entities/staff.entity';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
    @InjectRepository(UserPermission) private userPermissionRepo: Repository<UserPermission>,
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
  ){}
 async  assignPermission(dto:CreateUserPermissionDto) {
  
  const staff = await this.staffRepo.findOne({where:{id:dto.staffId}});
  if(!staff){
    throw new NotFoundException('Staff with this id not found');
  }
  const permission = await this.userPermissionRepo.findOne({where:{staff:{id:dto.staffId},permission:dto.permission},});
  if(permission){
    throw new NotFoundException('Staff alredy have this permission');
  }


  const userPermission=this.userPermissionRepo.create({staff,permission:dto.permission});
  await this.userPermissionRepo.save(userPermission);
  const updatedStaff = await this.staffRepo.findOne({
    where: { id: staff.id },
    relations: ['userPermissions'],
  });
  return {
    message: 'Permission assigned',
    id: staff.id,
    name: staff.name,
    permissions:updatedStaff?.userPermissions,
  };
 }

 async deletePermissions(dto:CreateUserPermissionDto){
  const userPermission = await this.userPermissionRepo.findOne({
    where:{staff:{id:dto.staffId},permission:dto.permission},
  });
  if(!userPermission){
    throw new NotFoundException('User Not Found');
  }
  await this.userPermissionRepo.remove(userPermission);
  return {message:'Permissions removed'}
 }

 async getPermission(staffId:number){
  return this.userPermissionRepo.find({
    where:{staff:{id:staffId}},
    relations:['permission']
  })
 }
}
