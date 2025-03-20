

import { PermissionEnum } from 'src/enum';
import { Permission } from 'src/permission/entities/permission.entity';
import { Staff } from 'src/staff/entities/staff.entity';

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
 
} from 'typeorm';

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type:'enum',enum:PermissionEnum})
  permission: PermissionEnum;

  @ManyToOne(()=>Staff, (staff)=> staff.userPermissions,{onDelete:'CASCADE'})
  staff :Staff;



}
