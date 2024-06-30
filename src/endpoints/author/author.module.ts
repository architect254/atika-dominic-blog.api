import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorService } from '@endpoints/author/author.service';
import { Author } from './author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
