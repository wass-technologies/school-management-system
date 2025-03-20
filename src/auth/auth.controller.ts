import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto); 
  }

  @Post('register/mainSchool')
 async register(@Body() dto:RegisterDto){
  return this.authService.register(dto);
 }

 @Post('register/subSchool')
 async schoolRegister(@Body() dto:RegisterDto){
  return this.authService.registerSubScholl(dto);
 }
 @Post('register/staff')
 async staffRegister(@Body() dto:RegisterDto){
  return this.authService.registerStaff(dto);
 }



 
}
