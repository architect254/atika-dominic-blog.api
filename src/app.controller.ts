import { GetUser } from '@core/models/get-user.decorator';
import { AuthorDto } from '@endpoints/author/author.dto';
import { AuthorService } from '@endpoints/author/author.service';
import { User } from '@endpoints/user/user.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private authorService: AuthorService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createAuthor(@Body() payload: AuthorDto, @GetUser() initiator: User) {
    return await this.authorService.create(payload, initiator);
  }

  @Get()
  async getAuthors() {
    return await this.authorService.getAuthor();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async updateAuthor(
    @Param('id') id,
    @Body() payload: AuthorDto,
    @GetUser() initiator: User,
  ) {
    return await this.authorService.update(id, payload, initiator);
  }
}
