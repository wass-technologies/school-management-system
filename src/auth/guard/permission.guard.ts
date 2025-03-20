import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Observable } from "rxjs";
import { UserPermission } from "src/user-permission/entities/user-permission.entity";
import { Repository } from "typeorm";
import { PERMISSION_KEY } from "../decorators/permissons.decoretor";

@Injectable()
export class PermissionGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        @InjectRepository(UserPermission) private readonly userPermissionRepo:Repository<UserPermission>,

    ){}
    async canActivate(context: ExecutionContext) {
        const requirePermission = this.reflector.getAllAndOverride<string[]>(
            PERMISSION_KEY, [context.getHandler(), context.getClass()]
        );
    
        if (!requirePermission || requirePermission.length === 0) {
            return true;
        }
    
        const request = context.switchToHttp().getRequest<Request>() as any;
        const user = request.user;
    
        if (!user || !user.id) {
            throw new ForbiddenException('Unauthorized');
        }

    
        // Extract permission names from userPermissions
        const userPermissions = user.userPermissions?.map(up => up.permission) || [];

    
        // Check if the user has all required permissions
        const hasPermission = requirePermission.every(perm => userPermissions.includes(perm));
    
        if (!hasPermission) {
            throw new ForbiddenException('You do not have the required permissions');
        }
    
        return true;
    }
    
    
}