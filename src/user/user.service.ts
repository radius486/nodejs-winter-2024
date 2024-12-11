import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { mockedUsers } from 'mocks/user-mocks';

type User = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

const users: User[] = mockedUsers;

let idCounter = 4;

@Injectable()
export class UserService {
  async getAllUsers() {
    return users;
  }

  async getUserById(id: string) {
    return users.find((user) => user.id === id);
  }

  async createUser(dto: CreateUserDto) {
    const user = {
      id: (idCounter++).toString(),
      login: dto.login,
      password: dto.password,
      version: 2,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    users.push(user);

    return user;
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto) {
    const user = users.find((user) => user.id === id);

    if (user.password === dto.oldPassword) {
      user.password = dto.newPassword;
      return user;
    }

    return user;
  }

  async deleteUserById(id: string) {
    const index = users.findIndex((user) => user.id === id);

    users.splice(index, 1);

    return id;
  }
}
