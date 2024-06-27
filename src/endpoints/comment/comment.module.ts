import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentController } from '@endpoints/comment/comment.controller';
import { CommentService } from '@endpoints/comment/comment.service';
import { ArticleService } from '@endpoints/article/article.service';

import { Comment } from '@endpoints/comment/comment.entity';
import { Article } from '@endpoints/article/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Article]),
  ],
  controllers: [CommentController],
  providers: [CommentService, ArticleService],
})
export class CommentModule {}
