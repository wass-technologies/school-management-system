import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';


import { MainSchool } from 'src/main-school/entities/main-school.entity';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { JwtPayload } from './interfaces/payload.interface';
import { ApprovalStatus, Role } from 'src/enum';
import { Staff } from 'src/staff/entities/staff.entity';
import { RegisterDto } from './dto/register.dto';
import { RoleRequest } from 'src/role-request/entities/role-request.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(MainSchool) private readonly mainSchoolRepo: Repository<MainSchool>,
    @InjectRepository(SubSchool) private readonly subSchoolRepo: Repository<SubSchool>,
    @InjectRepository(Staff) private readonly staffRepo:Repository<Staff>,
    @InjectRepository(RoleRequest) private readonly roleRequestrepo:Repository<RoleRequest>,
    private readonly jwtService: JwtService,
  ) {}






  //Register main School
  async register(dto:RegisterDto){
    const hashedPassword = await bcrypt.hash(dto.password,10);
    
    const existing = await this.mainSchoolRepo.findOne({where:{role:Role.MAIN_ADMIN}});
    if(existing){
        throw new ConflictException('Main Admin already Exists')
      }
    const mainSchool = this.mainSchoolRepo.create({
      ...dto,
      email:dto.email,
      password:hashedPassword,
      role:Role.MAIN_ADMIN,
      approvalStatus:ApprovalStatus.APPROVED

    });
    return this.mainSchoolRepo.save(mainSchool);
      
    
  }

  //Register SubSchool
  async registerSubScholl(dto:RegisterDto,){
    const hashedPassword = await bcrypt.hash(dto.password,10);
    const mainSchool= await this.mainSchoolRepo.findOne({where:{role:Role.MAIN_ADMIN}});

    if(!mainSchool){
      throw new NotFoundException('MainSchool Not Found');
    }
    const subSchool =  this.subSchoolRepo.create({...dto,
      email:dto.email,
      password:hashedPassword,
      name:dto.name,
      approvalStatus:ApprovalStatus.PENDING,
      mainSchool:mainSchool,
      
    });
    await this.subSchoolRepo.save(subSchool);

    const roleReques = this.roleRequestrepo.create({
      subSchool:subSchool,
      requestedRole:Role.SUB_ADMIN,
      status:ApprovalStatus.PENDING

    });
    return this.roleRequestrepo.save(roleReques);
  }

    //Register Staff
    async registerStaff(dto:RegisterDto,){
      const hashedPassword = await bcrypt.hash(dto.password,10);
      const mainSchool= await this.mainSchoolRepo.findOne({where:{role:Role.MAIN_ADMIN}});
  
      if(!mainSchool){
        throw new NotFoundException('MainSchool Not Found');
      }
      const staff =  this.staffRepo.create({...dto,
        email:dto.email,
        name:dto.name,
        password:hashedPassword,
        approvalStatus:ApprovalStatus.PENDING,
        mainSchool:mainSchool
    
      });
      await this.staffRepo.save(staff);
  
      const roleReques = this.roleRequestrepo.create({
        staff:staff,
        requestedRole:Role.STAFF,
        status:ApprovalStatus.PENDING
  
      });
      return this.roleRequestrepo.save(roleReques);
    }


// Login
  
  async login( loginDto : LoginDto) {
    const{email,password}=loginDto;
    let user;
    

 user = await this.mainSchoolRepo.findOne({where:{email}})
 if(!user){
  user = await this.subSchoolRepo.findOne({where: { email }});
 
 }if(!user){
  user = await this.staffRepo.findOne({where:{email}});
  
 }
 if(user.approvalStatus !== ApprovalStatus.APPROVED){
  throw new UnauthorizedException('Your request is pending aproval')
 }
 if(!user || !(await bcrypt.compare(password, user.password))){
  throw new UnauthorizedException('iInvalid email or Password')
 }
 //Get token
 const payLoad: JwtPayload ={id:user.id, email:user.email, role:user.role};
 return {accessToken: this.jwtService.sign(payLoad)};

   

  }

}
