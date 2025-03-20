import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PermissionService {
 constructor(
  @InjectRepository (Permission) private readonly permissionRepo:Repository<Permission>,
  @Inject(CACHE_MANAGER) private cacheManager:Cache,
 ){}
  async findAll() {
    let perms: Permission[] = await this.cacheManager.get('perms') || [];
    if(!perms){
      perms = await this.permissionRepo.find();
      await this.cacheManager.set('perms',perms,0);
    }
    return perms;
  }

  async cereatePermission(createPermissionDto:CreatePermissionDto){
    const permission =this.permissionRepo.create(createPermissionDto);
    return this.permissionRepo.save(permission);
  }
  

 
}
