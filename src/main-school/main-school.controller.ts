import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Query } from '@nestjs/common';
import { MainSchoolService } from './main-school.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Response } from 'express';


import { CreateMainSchoolDto } from './dto/create-main-school.dto';
import { PermissionEnum, Role, SubSchoolStatus } from 'src/enum';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permissions } from 'src/auth/decorators/permissons.decoretor';

@Controller('main-school')
@UseGuards(JwtAuthGuard,RolesGuard, PermissionGuard)
export class MainSchoolController {
  constructor(private readonly mainSchoolService: MainSchoolService) {}



  @Roles(Role.MAIN_ADMIN)
  @Get('dashbord')
  dashbord(){
    return {message:'Welcome'}
  }


  // //Add SubSchool

  // @Post('add-school')
  // @Roles(Role.MAIN_ADMIN)
  // createSubSchool(@Body() dto: CreateSubSchoolDto){
  //   return this.mainSchoolService.addSubSchool(dto);
  // }

  //Active  School
  
  @Patch('sub-school/:id/active')
  @Roles(Role.MAIN_ADMIN)
  activeSubSchool(@Param('id') subSchoolId:number){
    return this.mainSchoolService.setSubSchoolStatus(subSchoolId, SubSchoolStatus.ACTIVE);
  }

  //Deactive School

  @Patch('sub-school/:id/inactive')
  @Roles(Role.MAIN_ADMIN)
  deactiveSubSchool(@Param('id') subSchoolId:number){
    return this.mainSchoolService.setSubSchoolStatus(subSchoolId, SubSchoolStatus.INACTIVE);
  }

  //get All School

  @Get('all-Schools')
  @Roles(Role.MAIN_ADMIN)
  getAllSchools(@Query('page')page =1, @Query('limit')limit=10){
    return this.mainSchoolService.getAllSchools(page,limit);
    
  }

  // Get All Student
  @Get('students')
  @Roles(Role.MAIN_ADMIN)
  getAllStudents(@Query('page')page =1, @Query('limit')limit=10){
    return this.mainSchoolService.getAllStudents(page,limit);
  }

   // Get Active Schools
   @Get('active-schools')
   async getActiveSchool(@Query('page')page =1,
    @Query('limit')limit=10) {
     const active = await this.mainSchoolService.getActiveSchool(page,limit);
     return { active };
   }

   //Get All InActive Class
   @Get('inactive-schools')
  async getInActiveSchool(@Query('page')page =1, 
  @Query('limit')limit=10) {
    const inactive = await this.mainSchoolService.getInActiveSchool(page,limit);
    return { inactive };
  }

  //Pdf Genarate


  @Get('sub-school-list-pdf')
  @Roles( Role.STAFF)
  @Permissions(PermissionEnum.GENERATE_REPORTS)
  async getSubSchoolListPdf(@Res() res: Response) {
    const pdfpath = await this.mainSchoolService.getSubSchoolList();

    // Serve the file for download
    res.download(pdfpath, 'subSchoolList.pdf', (err) => {
      if (err) {
        res.status(500).send('Error downloading file.');
      }
    });
  }















  @Post('create-main')
  async createmain(@Body()dto:CreateMainSchoolDto){
    return this.mainSchoolService.createadmin(dto);


  }

  
}
