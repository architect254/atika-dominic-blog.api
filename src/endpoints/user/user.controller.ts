import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { configureFileStorage } from '@core/config/multer.config';
import { GetUser } from '@core/models/get-user.decorator';

import { UserService } from '@endpoints/user/user.service';
import { User } from '@endpoints/user/user.entity';
import { UserDto } from '@endpoints/user/user.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() payload: UserDto, @GetUser() initiator: User) {
    return await this.userService.create(payload, initiator);
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return await this.userService.read(id);
  }

  @Get()
  async getAllUsers(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.userService.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() payload: UserDto,
    @GetUser() initiator: User,
  ) {
    return await this.userService.update(id, payload, initiator);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    await this.userService.drop(id);
  }
}
