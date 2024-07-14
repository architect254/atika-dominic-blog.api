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

import { GetUser } from '@core/models/get-user.decorator';

import { BookService } from './book.service';
import { BookDto } from './book.dto';
import { User } from '@endpoints/user/user.entity';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createBook(@Body() payload: BookDto, @GetUser() initiator: User) {
    return await this.bookService.create(payload, initiator);
  }

  @Get('/:id')
  async getBook(@Param('id') id: number) {
    return await this.bookService.read(id);
  }

  @Get()
  async getAllBooks(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.bookService.readAll(page, pageSize);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async updateBook(
    @Param('id') id: number,
    @Body() payload: BookDto,
    @GetUser() initiator: User,
  ) {
    return await this.bookService.update(id, payload, initiator);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteBook(@Param('id') id: number) {
    await this.bookService.drop(id);
  }
}
