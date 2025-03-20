import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubSchool } from "./entities/sub-school.entity";
import { Repository } from "typeorm";

@Injectable()
export class SubSchoolActiveGuard implements CanActivate{
    constructor(
        @InjectRepository(SubSchool) private readonly subSchoolRepository: Repository<SubSchool>
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const {subSchoolId} = request.body || request.params;
        if(!subSchoolId){
            throw new ForbiddenException('School Id Is Required');
        }
        const subSchool = await this.subSchoolRepository.findOne({where:{id:subSchoolId}});
        if(!subSchool){
            throw new ForbiddenException(' School Not Found');
        }
        if(!subSchool.status){
            throw new ForbiddenException('School Not Active. Active is Required');
        }
        return true;

    }

    
}