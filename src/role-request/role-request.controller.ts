import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RoleRequestService } from './role-request.service';
import { CreateRoleRequestDto } from './dto/create-role-request.dto';
import { UpdateRoleRequestDto } from './dto/update-role-request.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enum';

@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.MAIN_ADMIN)
@Controller('role-request')
export class RoleRequestController {
  constructor(private readonly roleRequestService: RoleRequestService) {}

  @Get('pending')
  getPendingRequest(){
    return this.roleRequestService.getPendingRequest();
  }

  @Patch(':reqId/process')
  approvrequest(@Param('reqId') reqId:number, @Query('approve') approve:string){
    return this.roleRequestService.processRequest(reqId,approve === 'true')
  }

}
