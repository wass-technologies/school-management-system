import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException, ParseIntPipe, Query, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { RequestWithUser } from 'src/auth/roles/request-user.interface';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/enum';


@Controller('student')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.SUB_ADMIN)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  
  @Post(':subSchoolId/:classId')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SUB_ADMIN)
  async addStudent(@Param('subSchoolId') subSchoolId:number,
                      @Param('classId')classId:number,
                    @Body() createStudentDto: CreateStudentDto,
                  @Req() req: RequestWithUser) {
                    const subAdmin= req.user.id;
                    if(!subAdmin){
                      throw new ForbiddenException('You Don not have permission');
                    }
    return await this.studentService.addStudent(subSchoolId,classId,createStudentDto,subAdmin);
  }


  @Put(':subSchoolId/:classId/:id')
  async updateStudent(@Param('id') id: number,@Param('subSchoolId') subSchoolId:number,
  @Param('classId')classId:number, @Body() dto: UpdateStudentDto,@Req() req: RequestWithUser){
    const subAdmin= req.user.id;
    if(!subAdmin){
      throw new ForbiddenException('You Don not have permission');
    }
    return this.studentService.updateStudent(subSchoolId,classId,dto,id,subAdmin);
  }

  // Get student by ID
  @Get(':subSchoolId/studentID/:id')
  async getStudentById(
    @Param('subSchoolId') subSchoolId: number,
    @Param('id') id: number,
    @Req() req: RequestWithUser
  ) {
    const subAdmin = req.user.id;
    if (!subAdmin) {
      throw new ForbiddenException('You do not have permission');
    }
    return await this.studentService.getStudentById(id, subSchoolId, subAdmin);
  }

  // Search students by name
  @Get(':subSchoolId/search')
  async searchStudents(
    @Param('subSchoolId') subSchoolId: number,
    @Query('name') name: string,
    @Req() req: RequestWithUser
  ) {
    const subAdmin = req.user.id;
    if (!subAdmin) {
      throw new ForbiddenException('You do not have permission');
    }
    return await this.studentService.searchStudentsByName(name, subSchoolId, subAdmin);
  }

   // Get students by class ID 
   @Get(':subSchoolId/class/:classId')
   async getStudentsByClass(
     @Param('subSchoolId') subSchoolId: number,
     @Param('classId') classId: number,
     @Req() req: RequestWithUser
   ) {
     const subAdmin = req.user.id;
     if (!subAdmin) {
       throw new ForbiddenException('You do not have permission');
     }
     return await this.studentService.getStudentsByClassId(classId, subSchoolId, subAdmin);
   }



  // Get students by age

  @Get(':subSchoolId/age')
  async getStudentsByAge(
    @Param('subSchoolId') subSchoolId: number,
    @Query('age') age: number,
    @Req() req: RequestWithUser
  ) {
    const subAdmin = req.user.id;
    if (!subAdmin) {
      throw new ForbiddenException('You do not have permission');
    }
    return await this.studentService.getStudentsByAge(age, subSchoolId, subAdmin);
  }


  



  

  
}
