import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { SubSchoolService } from './sub-school.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enum';





@Controller('sub-school')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.SUB_ADMIN)
export class SubSchoolController {
  constructor(private readonly subSchoolService: SubSchoolService) {}



}
