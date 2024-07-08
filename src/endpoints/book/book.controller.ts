import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@core/models/get-user.decorator';

import { BookService } from './book.service';
import { BookDto } from './book.dto';
import { User } from '@endpoints/user/user.entity';

// @UseGuards(AuthGuard('jwt'))
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async createBook(@Body() payload: BookDto, @GetUser() initiator: User) {
    return await this.bookService.create(payload, initiator);
  }

  @Get('/:id')
  async getBook(@Param('id') id) {
    return await this.bookService.read(id);
  }

  @Get()
  async getAllBooks(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.bookService.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateBook(
    @Param('id') id,
    @Body() payload: BookDto,
    @GetUser() initiator: User,
  ) {
    return await this.bookService.update(id, payload, initiator);
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id) {
    await this.bookService.drop(id);
  }
}
