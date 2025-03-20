
import { PermissionEnum } from 'src/enum';
import { UserPermission } from 'src/user-permission/entities/user-permission.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum:PermissionEnum, unique: true })
  permission:PermissionEnum;

  @OneToMany(()=> UserPermission,(userPermission) => userPermission.permission)
  userPermission:UserPermission[];
}
