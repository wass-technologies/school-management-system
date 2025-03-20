import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleRequestDto } from './dto/create-role-request.dto';
import { UpdateRoleRequestDto } from './dto/update-role-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRequest } from './entities/role-request.entity';
import { Repository } from 'typeorm';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { ApprovalStatus } from 'src/enum';

@Injectable()
export class RoleRequestService {
constructor(
  @InjectRepository(RoleRequest) private readonly roleReqRepo:Repository<RoleRequest>,
  @InjectRepository(SubSchool) private readonly subSchoolRepo:Repository<SubSchool>,
  @InjectRepository(Staff) private readonly staffRepo:Repository<Staff>,
){}


//get all pending Request
async getPendingRequest() {
  const requests = await this.roleReqRepo.find({
    where: {
      status: ApprovalStatus.PENDING,
    },
    relations: ['subSchool', 'staff'],
  });

  // Formatting the response without null values
  return requests.map(req => {
    const result: any = { status: req.status }; // Always include status

    if (req.subSchool) {
      result.subSchool = { id: req.subSchool.id, name: req.subSchool.name };
    }
    if (req.staff) {
      result.staff = { id: req.staff.id, name: req.staff.name };
    }

    return result;
  });
}



//Approve And reject
async processRequest(reqId:number,approve:boolean){
  const request = await this.roleReqRepo.findOne({
    where:{id:reqId},
    relations:['subSchool', 'staff'],
  });

  if(!request){
    throw new NotFoundException('Request Not Found');

  }
  request.status=approve ? ApprovalStatus.APPROVED: ApprovalStatus.REJECTED;
  await this.roleReqRepo.save(request);

  if(approve){
    if(request.subSchool){
      request.subSchool.approvalStatus= ApprovalStatus.APPROVED;
      await this.subSchoolRepo.save(request.subSchool);
    }else if(request.staff){
      request.staff.approvalStatus = ApprovalStatus.APPROVED;
      await this.staffRepo.save(request.staff);

    }
  }
  return {message: `Request ${approve ? 'approve': 'rejected'} `};

}



}
