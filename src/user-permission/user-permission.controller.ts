import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('user-permission')
@Roles(Role.MAIN_ADMIN)
@UseGuards(JwtAuthGuard,RolesGuard)
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @Post('assign-permission')
  async assign(@Body()dto:CreateUserPermissionDto){
    return this.userPermissionService.assignPermission(dto);
  }

  @Delete('delete-permission')
  async delete(@Body()dto:CreateUserPermissionDto){
    return this.userPermissionService.deletePermissions(dto);

  }

  @Get('getPermission/:staffId')
  async getAll(@Param('staffId')staffId:number){
    return this.userPermissionService.getPermission(staffId);

  }

  
}
