import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}


  @Get()
  findAll() {
    return this.permissionService.findAll();
  }
  @Post()
  createPermission(@Body()createPermissionDto:CreatePermissionDto){
    return this.permissionService.cereatePermission(createPermissionDto);

  }
}
