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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { configureFileStorage } from '@core/config/multer.config';
import { GetUser } from '@core/models/get-user.decorator';

import { ArticleService } from './article.service';
import { ArticleDto } from './article.dto';
import { User } from '@endpoints/user/user.entity';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createArticle(@Body() payload: ArticleDto, @GetUser() initiator: User) {
    return await this.articleService.create(payload, initiator);
  }

  @Get('/:id')
  async getArticle(@Param('id') id: number) {
    return await this.articleService.read(id);
  }

  @Get()
  async getAllArticles(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.articleService.readAll(page, pageSize);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async updateArticle(
    @Param('id') id: number,
    @Body() payload: ArticleDto,
    @GetUser() initiator: User,
  ) {
    return await this.articleService.update(id, payload, initiator);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteArticle(@Param('id') id: number) {
    await this.articleService.drop(id);
  }
}
