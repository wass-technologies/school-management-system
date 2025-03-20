import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
import { SubSchool } from 'src/sub-school/entities/sub-school.entity';

@Injectable()
export class ClassesService {

  constructor(
    @InjectRepository(ClassEntity) private readonly classRepository: Repository<ClassEntity>,
    @InjectRepository(SubSchool) private readonly subSchoolRepository: Repository<SubSchool>,

  ){}
// ADD CLASS
async addClass(subSchoolId:number,dto:CreateClassDto, schoolAdmin:number){
  
  
  const subSchool = await this.subSchoolRepository.findOne({where:{id: subSchoolId}});
  if(!subSchool){
      throw new NotFoundException('School not found');
  }
  const existingClass = await this.classRepository.findOne({where:{name:dto.name,subSchool}})
  if(existingClass){
      throw new ConflictException('Class already exists');
  }
  if(subSchool?.id !== schoolAdmin){
    throw new ForbiddenException('You do not have access to this school')
  }
  
  const newClass = this.classRepository.create({...dto, subSchool})
  return await this.classRepository.save(newClass)

}

//delete School
async deleteClass(subSchoolId:number, classId:number,schoolAdmin:number){
 
  const classDelete = await this.classRepository.findOne({where:{id:classId, subSchool:{id:subSchoolId}}});
  
  if(!classDelete){
    throw new NotFoundException('Class Not Found');
  }
  const subSchool = await this.subSchoolRepository.findOne({ where: { id: subSchoolId } });

  if(subSchool?.id !== schoolAdmin){
    throw new ForbiddenException('You do not have access to this school')
  }
  return await this.classRepository.remove(classDelete);
}

//Get All Classes
async getAllClasses(subSchoolId: number, page: number = 1, pageSize: number = 10, subAdmin:number) {


  // Check if the subSchool exists
  const subSchool = await this.subSchoolRepository.findOne({ where: { id: subSchoolId } });
  if (!subSchool) {
    throw new NotFoundException('School not found');
  }
  if(subSchool.id !== subAdmin){
    throw new ForbiddenException('You do not have access to this school')
  }

  // Get the classes for the specific SubSchool with pagination and relations
  const [classes, total] = await this.classRepository.findAndCount({
    where: { subSchool: { id: subSchoolId } },
    skip: (page - 1) * pageSize,  // Skip for pagination
    take: pageSize,               // Take the number of classes per page
    relations: ['subSchool'],     // Make sure subSchool relation is loaded
  });

  // Map the classes to the desired output
  const formattedClass = classes.map((classEntity) => ({
    classId: classEntity.id,
    className: classEntity.name,
    schoolId: classEntity.subSchool.id,
    schoolName: classEntity.subSchool.name,
  }));

  const hasNextPage = classes.length ==pageSize

  // Return the paginated response
  return {
    classes: formattedClass,
    totalClass: total,
    totalPage: Math.ceil(total / pageSize),
    currentPage: page,
    hasNextPage: hasNextPage,
  };
}


}
