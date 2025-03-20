import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MainSchoolModule } from './main-school/main-school.module';
import { SubSchoolModule } from './sub-school/sub-school.module';
import { ClassesModule } from './classes/classes.module';
import { StudentModule } from './student/student.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { StaffModule } from './staff/staff.module';
import { AddressModule } from './address/address.module';
import { PermissionModule } from './permission/permission.module';
import { UserPermissionModule } from './user-permission/user-permission.module';
import { UserModule } from './user/user.module';
import { RoleRequestModule } from './role-request/role-request.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        
          type: 'mysql',
          host:process.env.DB_HOST,
          port:Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities:[__dirname +'/**/*.entity.js'],
          synchronize: true,
 
    }),
    AuthModule, MainSchoolModule, SubSchoolModule, ClassesModule, StudentModule, StaffModule, AddressModule, PermissionModule, UserPermissionModule, UserModule, RoleRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],

  
})
export class AppModule {}
