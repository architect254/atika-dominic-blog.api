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
  Header,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@core/models/get-user.decorator';

import { CommentService } from './comment.service';
import { CommentDto } from './comment.dto';
import { User } from '@endpoints/user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  async createComment(@Body() payload: CommentDto, @GetUser() initiator: User) {
    return await this.commentService.create(payload, initiator);
  }

  @Get('/:id')
  async getComment(@Param('id') id: number) {
    return await this.commentService.read(id);
  }

  @Get()
  async getAllComments(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.commentService.readAll(page, pageSize);
  }

  @Delete('/:id')
  async deleteComment(@Param('id') id: number) {
    await this.commentService.drop(id);
  }
}
