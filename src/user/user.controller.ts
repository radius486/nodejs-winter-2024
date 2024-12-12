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

import { GetUserByIdParams } from './params/get-user-by-id-params';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param() params: GetUserByIdParams) {
    return this.userService.getUserById(params.id);
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Put(':id')
  updateUserPassword(
    @Body() passwordDto: UpdatePasswordDto,
    @Param() params: GetUserByIdParams,
  ) {
    return this.userService.updateUserPassword(params.id, passwordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUserById(@Param() params: GetUserByIdParams) {
    return this.userService.deleteUserById(params.id);
  }
}
