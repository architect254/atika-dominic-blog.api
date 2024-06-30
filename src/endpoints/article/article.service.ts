import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Article } from '@endpoints/article/article.entity';
import { ArticleDto } from '@endpoints/article/article.dto';

import { User } from '@endpoints/user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,
  ) {}

  async create(payload: ArticleDto, initiator: User): Promise<Article> {
    const article = new Article();

    Object.assign(article, payload);

    article.creator = initiator;
    article.updator = initiator;


    return await this.save(article);
  }

  async read(id): Promise<Article> {
    const article = await this.articleRepo
      .createQueryBuilder('article')
      .where('article.id =:id', { id })
      .leftJoinAndSelect('article.creator', 'creator')
      .leftJoinAndSelect('article.updator', 'updator')
      .getOne();

    if (!article || !Object.keys(article).length) {
      const errorMessage = `Article Not Found`;
      throw new NotFoundException(errorMessage);
    }

    return article;
  }

  async readAll(page: number, pageSize: number): Promise<Article[]> {
    const skip: number = pageSize * (page - 1);

    return await this.articleRepo.find({ skip, take: pageSize });
  }

  async update(id, payload: ArticleDto, initiator: User): Promise<Article> {
    const article: Article = await this.read(id);

    Object.assign(article, payload);
    article.updator = initiator;

    return await this.articleRepo.save(article);
  }

  async drop(id): Promise<void> {
    const article: Article = await this.read(id);
    const result = await this.articleRepo.remove(article);

    if (!result) {
      const errorMessage = `Operation Failed:DELETE`;
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async save(article: Article): Promise<Article> {
    try {
      return await this.articleRepo.save(article);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Article Exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
