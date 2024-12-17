import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetUserByIdParams } from './params/get-user-by-id-params';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { UserService } from './user.service';

const userExample = {
  id: 'b2a93819-d28c-465c-9402-a612fec77f85',
  login: 'user_1',
  version: 1,
  createdAt: 1733915529813,
  updatedAt: 1733915529813,
};

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, example: [userExample] })
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', example: 'b2a93819-d28c-465c-9402-a612fec77f85' })
  @ApiResponse({ status: 200, example: userExample })
  @Get(':id')
  getUserById(@Param() params: GetUserByIdParams) {
    return this.userService.getUserById(params.id);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, example: userExample })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string', example: 'user_4' },
        password: { type: 'string', example: 'qwerty123' },
      },
    },
  })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Update existing user by id' })
  @ApiParam({ name: 'id', example: 'b2a93819-d28c-465c-9402-a612fec77f85' })
  @ApiResponse({ status: 200, example: userExample })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['oldPassword', 'newPassword'],
      properties: {
        oldPassword: { type: 'string', example: 'qwerty' },
        newPassword: { type: 'string', example: 'asdfgh' },
      },
    },
  })
  @Put(':id')
  updateUserPassword(
    @Body() passwordDto: UpdatePasswordDto,
    @Param() params: GetUserByIdParams,
  ) {
    return this.userService.updateUserPassword(params.id, passwordDto);
  }

  @ApiOperation({ summary: 'Delete existing user by id' })
  @ApiParam({ name: 'id', example: 'b2a93819-d28c-465c-9402-a612fec77f85' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUserById(@Param() params: GetUserByIdParams) {
    return this.userService.deleteUserById(params.id);
  }
}
