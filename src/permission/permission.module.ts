import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports:[
    TypeOrmModule.forFeature([Permission]),
    AuthModule,
    CacheModule.register(),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
