import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(context: ExecutionContext,):boolean  {

   const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
    context.getHandler(),
    context.getClass(),
   ])

   // If no roles are defined, allow access
    if(!requireRoles || requireRoles.length==0){
      return true;
    }

    //Get the user's roles
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!requireRoles.includes(user.role) ){
      throw new ForbiddenException('you don`t have permission' )
    }


    return true;
    
}
}
