import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        console.log('Received Token:', request.headers['authorization']);
        return super.canActivate(context);
      }
      
    handleRequest(err, user, info){
        // console.log(user);
        if(err ){
            if (info && info.name == 'TokenExpiredError'){
                throw new UnauthorizedException('Token has expired');
              }
            throw new UnauthorizedException('Invalid token')
        }
        return user;
        
    }
    
}