import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { RequestWithUser } from 'src/auth/roles/request-user.interface';
import { Role } from 'src/enum';


@Controller('classes')
@UseGuards(JwtAuthGuard,RolesGuard)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('add/:subschoolId')
  @Roles(Role.SUB_ADMIN)
  async addClass(@Param('subschoolId')subSchoolId:number, @Body()dto:CreateClassDto,
  @Req() req:RequestWithUser){
    return await this.classesService.addClass(subSchoolId, dto,req.user.id);

  }

  @Delete(':subschoolId/:classId')
  @Roles(Role.SUB_ADMIN)
  async deleteClass(@Param('subschoolId') subSchoolId:number,@Param('classId') classId:number,@Req() req:RequestWithUser){
    return this.classesService.deleteClass(subSchoolId,classId,req.user.id);

  }
  @Get('all/:subSchoolId')
  @Roles(Role.SUB_ADMIN)
  async getAllClasses(@Param('subSchoolId') subSchoolId: number, @Query('page') page: number, @Query('pageSize') pageSize: number,@Req() req:RequestWithUser,){
    const schoolAdmin= req.user.id;
    return this.classesService.getAllClasses(subSchoolId,page,pageSize,schoolAdmin);

  }


  

  
}
