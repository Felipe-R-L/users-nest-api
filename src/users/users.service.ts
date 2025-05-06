import { Injectable, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Felipe',
      email: 'felipe@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Yuri',
      email: 'yuri@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Mark',
      email: 'mark@gmail.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Leo',
      email: 'leo@gmail.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    if(role){
      const rolesArray = this.users.filter((user) => user.role === role);
      if(!rolesArray.length){
        throw new NotFoundException('Role not found.');
      }
      return rolesArray
    }
    else return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
      if(!user)
        throw new NotFoundException('User not found.');
    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id! - a.id!);
    const newUser = {
      id: usersByHighestId[0].id! + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    return this.users.filter((user) => id !== user.id!);  
}
}
