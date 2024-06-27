import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Comment } from '@endpoints/comment/comment.entity';
import { CommentDto } from '@endpoints/comment/comment.dto';

import { User } from '@endpoints/user/user.entity';
import { ArticleService } from '@endpoints/article/article.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    private articleService: ArticleService,
  ) {}

  async create(payload: CommentDto, initiator: User): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, payload);

    const article = await this.articleService.read(payload.article_id);

    comment.article = article;

    comment.creator = initiator;
    comment.updator = initiator;

    return await this.save(comment);
  }

  async read(id): Promise<Comment> {
    const comment = await this.commentRepo
      .createQueryBuilder('comment')
      .where('comment.id =:id', { id })
      .leftJoinAndSelect('comment.creator', 'creator')
      .leftJoinAndSelect('comment.updator', 'updator')
      .getOne();

    if (!comment || !Object.keys(comment).length) {
      const errorMessage = `Comment Not Found`;
      throw new NotFoundException(errorMessage);
    }

    return comment;
  }

  async readAll(page: number, pageSize: number): Promise<Comment[]> {
    const skip: number = pageSize * (page - 1);

    return await this.commentRepo.find({ skip, take: pageSize });
  }

  async drop(id): Promise<void> {
    const comment: Comment = await this.read(id);
    const result = await this.commentRepo.remove(comment);

    if (!result) {
      const errorMessage = `Operation Failed:DELETE`;
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async save(comment: Comment): Promise<Comment> {
    try {
      return await this.commentRepo.save(comment);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Comment Exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
