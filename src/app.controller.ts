import { configureFileStorage } from '@core/config/multer.config';
import { GetUser } from '@core/models/get-user.decorator';
import { AuthorDto } from '@endpoints/author/author.dto';
import { AuthorService } from '@endpoints/author/author.service';
import { User } from '@endpoints/user/user.entity';
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private authorService: AuthorService) {}

  @Post('upload-article_image')
  @UseInterceptors(
    FileInterceptor('article_image', configureFileStorage(`artcle_image`)),
  )
  async uploadArticleImage() {}

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('profile_image', configureFileStorage(`profile_image`)),
  )
  async createAuthor(
    @UploadedFile() file: any,
    @Body() payload: AuthorDto,
    @GetUser() initiator: User,
  ) {
    console.log(`UPLOAD`, file, payload);
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
