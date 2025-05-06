import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Param, Get, Post, Body, Patch, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService){}
 
   @Get()
  findAll(@Query('role') role?:'INTERN' | 'ADMIN' | 'ENGINEER') {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe, ValidationPipe) id: number, @Body() userUpdate: UpdateUserDto) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number,){
    return this.usersService.delete(id);
  }
}