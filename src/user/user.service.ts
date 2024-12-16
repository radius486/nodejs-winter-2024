import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { mockedUsers } from 'mocks/user-mocks';
import * as uuid from 'uuid';
import { ErrorMessages } from 'src/constants/error-messages';

type User = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

const users: User[] = mockedUsers;

function excludePassword(user: User) {
  const { id, login, version, createdAt, updatedAt } = user;

  return { id, login, version, createdAt, updatedAt };
}

@Injectable()
export class UserService {
  async getAllUsers() {
    return users.map((user) => {
      return excludePassword(user);
    });
  }

  async getUserById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `userId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    return excludePassword(user);
  }

  async createUser(dto: CreateUserDto) {
    const user = {
      id: uuid.v4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    users.push(user);

    return excludePassword(user);
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `userId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.password !== dto.oldPassword) {
      throw new HttpException(
        ErrorMessages.oldPasswordIsWrong,
        HttpStatus.FORBIDDEN,
      );
    }

    user.password = dto.newPassword;
    user.version++;
    user.updatedAt = new Date().getTime();

    return excludePassword(user);
  }

  async deleteUserById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `userId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    users.splice(index, 1);
  }
}
