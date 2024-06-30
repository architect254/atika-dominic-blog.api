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
import { FileInterceptor } from '@nestjs/platform-express';

import { File } from 'multer';

import { configureFileStorage } from '@core/config/multer.config';
import { GetUser } from '@core/models/get-user.decorator';

import { ArticleService } from './article.service';
import { ArticleDto } from './article.dto';
import { User } from '@endpoints/user/user.entity';

// @UseGuards(AuthGuard('jwt'))
@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  async createArticle(@Body() payload: ArticleDto, @GetUser() initiator: User) {
    return await this.articleService.create(payload, initiator);
  }

  @Get('/:id')
  async getArticle(@Param('id') id) {
    return await this.articleService.read(id);
  }

  @Get()
  async getAllArticles(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.articleService.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateArticle(
    @Param('id') id,
    @Body() payload: ArticleDto,
    @GetUser() initiator: User,
  ) {
    return await this.articleService.update(id, payload, initiator);
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id) {
    await this.articleService.drop(id);
  }
}
