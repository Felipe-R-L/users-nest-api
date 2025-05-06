import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/app/generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
constructor(private readonly databaseService: DatabaseService){}

  async create(createEmployeeInput: Prisma.EmployeesCreateInput) {
     return this.databaseService.employees.create({
      data: createEmployeeInput
     })
  }
  async findAll(role?: 'INTERN'|'ENGINEER'|'ADMIN') {
    if(role)
    return this.databaseService.employees.findMany({
      where: {
        role,
      }
    });
    return this.databaseService.employees.findMany();
  }
  async findOne(id: number) {
    return this.databaseService.employees.findUnique({
      where:{
        id,
      }
    })
  }
  async update(id: number, updateEmployeeInput: Prisma.EmployeesUpdateInput) {
    return this.databaseService.employees.update({
      where:{
        id,
      },
      data:updateEmployeeInput
    })
  }
  async remove(id: number) {
    return this.databaseService.employees.delete({
      where:{
        id,
      }
    })
  }
}