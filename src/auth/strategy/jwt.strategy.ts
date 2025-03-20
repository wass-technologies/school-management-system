import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces/payload.interface';
import { MainSchool } from 'src/main-school/entities/main-school.entity';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Role } from 'src/enum';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(MainSchool) private mainSchoolRepo: Repository<MainSchool>,
    @InjectRepository(SubSchool) private subSchoolRepo: Repository<SubSchool>,
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
  ) {
    // Configure passport strategy to extract JWT from Authorization header
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: process.env.JWT_SECRET_KEY || 'asdreqwdftgfdsawkhjfdasvvb',
    });
  }

  // Validate the JWT payload (id, email, role) and return the user
  async validate(payload: JwtPayload) {
    let user;

   //fetch the user from the corresponding repository
    if (payload.role === Role.MAIN_ADMIN) {
      user = await this.mainSchoolRepo.findOne({ where: { id: payload.id } });
    } else if (payload.role === Role.SUB_ADMIN) {
      user = await this.subSchoolRepo.findOne({ where: { id: payload.id } });
    } else if (payload.role === Role.STAFF) {
      user = await this.staffRepo.findOne({ 
        where: { id: payload.id }, 
        relations: ['userPermissions'],
    });
    }

    // If no user is found
    if (!user) {
      throw new UnauthorizedException('Invalid token or user not found');
    }
    const permissions = user.userPermissions?.map(up => up.permission) || [];
   

    
    return user;
  }
}
