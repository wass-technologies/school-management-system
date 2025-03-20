import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import * as bcrypt from 'bcrypt';

import { MainSchool } from './entities/main-school.entity';
import { CreateSubSchoolDto } from 'src/sub-school/dto/create-sub-school.dto';

import { CreateMainSchoolDto } from './dto/create-main-school.dto';
import * as  path from 'path';
import * as fs from 'fs';
import { size } from 'pdfkit/js/page';
import { Role, SubSchoolStatus } from 'src/enum';




@Injectable()
export class MainSchoolService {
  constructor(
    @InjectRepository(SubSchool) private subSchoolRepo:  Repository<SubSchool>,
    @InjectRepository(MainSchool) private mainSchoolRepo: Repository<MainSchool>,
  ){}

// //Add School and Assign Role 
// async addSubSchool (createSubSchoolDto:CreateSubSchoolDto){
//   const existingEmail = await this.subSchoolRepo.findOne({where: {email: createSubSchoolDto.email}})
//   if(existingEmail){
//     throw new ConflictException('Email already exists');
//   }
//   const existingSchoolName = await this.subSchoolRepo.findOne({where: {name: createSubSchoolDto.name}})
//   if(existingSchoolName){
//     throw new ConflictException('School already exists');
//   }

//   const hashedPassword = await bcrypt.hash(createSubSchoolDto.password,10);
//   const subschool = this.subSchoolRepo.create({
//     ...createSubSchoolDto,
//     password:hashedPassword,
//     status:SubSchoolStatus.ACTIVE,
//     role:Role.SUB_ADMIN,


//   });
//   return await this.subSchoolRepo.save(subschool);
  
// }



  //Active and Deactive SubSchool

  async setSubSchoolStatus(subSchoolId: number, isActivate:SubSchoolStatus){
    const subschool= await this.subSchoolRepo.findOne({where:{id:subSchoolId}});
    if(!subschool) throw new NotFoundException('school not found');
    subschool.status=isActivate;
    await this.subSchoolRepo.save(subschool);
    return {message: `school ${isActivate === SubSchoolStatus.ACTIVE ? 'Active' : 'Inactive'} successfully`,
              SchoolId: subschool.id, SchoolName: subschool.name, Status:subschool.status};

  }

  //Get All School


  async getAllSchools(page: number, limit:number){
    const [school, total] = await this.subSchoolRepo.findAndCount({
      skip: (page - 1) * limit,
      take:limit,
      select: ['id', 'name', 'address'],
    })
    return {data:school, total,
      currentPage:page,
      totalPage:Math.ceil(total/limit),
      nextPage:page*limit<total,
      prevPage:page>1
    };
  }

 

  
// Get All Student
async getAllStudents(page: number, limit: number) {
  try {
  
  
    const subSchools = await this.subSchoolRepo.find({
      relations: ['classes', 'classes.students'],
      skip: (page - 1) * limit, 
      take: limit,  
    });

    const students = subSchools.flatMap((subSchool) => 
      subSchool.classes.flatMap((classEntity) => 
        classEntity.students.map(student => ({
          id: student.id,
          name: student.name,
          className: classEntity.name,
          school: subSchool.name,
          schoolId:subSchool.id
        }))
      )
    );

    return {
      data: students,
      total: students.length,
      currentPage:page,
      nextPage:page*limit<students.length,
      prevPage:page>1
        // Total number of students 
    };
  } catch (error) {
    console.error("Error fetching students:", error);
    throw new Error("Failed to fetch students");
  }
}


  // Active School And Inactive School
  async getActiveSchool(page:number, limit:number,){
    const [active, total] = await this.subSchoolRepo.findAndCount({
      where: {
        status:SubSchoolStatus.ACTIVE
      },
      select:['id', 'name', 'address', 'status', 'email'],
      skip:(page - 1),
      take:limit,
    });
    return {data:active,total,
      currentPage:page,
      totalPage:Math.ceil(total/limit),
      nextPage:page*limit<total,
      prevPage:page<1,

    }


  }
  async getInActiveSchool(page:number,limit:number){
    const [inactive, total] = await this.subSchoolRepo.findAndCount({
      where: {
        status:SubSchoolStatus.INACTIVE
      },
      select:['id', 'name', 'address', 'status', 'email'],
      skip:(page - 1)*limit,
      take:limit,
    });
    return {data:inactive, total,
      currentPage:page,
      totalPage:Math.ceil(total/limit),
      nextPage:page*limit<total,
      prevPage:page<1,
    }

  }

  //Get All School Details Pdf

async getSubSchoolList(){
  const subSchool = await this.subSchoolRepo.find({
    select:['id', 'name', 'address', 'status', 'email'],
  });

  const fs = require('fs');


  const PDFDocument = require('pdfkit');
  const pdfdoc= new PDFDocument({margin:30, size:'A4'});




  const pdfPath = 'subSchoolList.pdf'
  pdfdoc.pipe(fs.createWriteStream(pdfPath));

    pdfdoc.fontSize(18).text('SubSchool List', { align: 'center' });
    pdfdoc.moveDown(2);


    const headers = ['ID', 'Name', 'Address', 'Status', 'Email'];
    const columnWidth = [20, 80, 170, 50, 160];


    let x = 50;
    headers.forEach((header, index) => {
      pdfdoc.fontSize(12).text(header, x, 100, { width: columnWidth[index], align: 'center' });
      x += columnWidth[index];
    });


    pdfdoc.moveTo(50, 120).lineTo(x, 120).stroke();

    // Draw each SubSchool row
    let y = 130; // Start Y position for rows
    subSchool.forEach(subSchool => {
      x = 50; // Reset x position for each row

      const rowData = [
        subSchool.id.toString(),
        subSchool.name,
        subSchool.address.length>30? subSchool.address.slice(0,30)+'...':subSchool.address,
        subSchool.status === SubSchoolStatus.ACTIVE ? 'Active' : 'Inactive',
        subSchool.email,
      ];

      rowData.forEach((data, index) => {
        pdfdoc.fontSize(10).text(data, x, y, { width: columnWidth[index], align: 'center' });
        x += columnWidth[index];
      });

      // Draw row line
      pdfdoc.moveTo(50, y + 10).lineTo(x, y + 10).stroke();

      y += 20; // Move down to the next row
    });

    // Finalize the PDF and return file path
    pdfdoc.end();
    return pdfPath;
  
}



 




  //mainadmin 
  async createadmin(dto:CreateMainSchoolDto){
    const hashedPassword = await bcrypt.hash(dto.password,10);
    const mainAdmin = this.mainSchoolRepo.create({
      ...dto,
      password:hashedPassword,
      role:Role.MAIN_ADMIN
    });
    return await this.mainSchoolRepo.save(mainAdmin);
  }



}



