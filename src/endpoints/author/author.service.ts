import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Author } from '@endpoints/author/author.entity';
import { AuthorDto } from '@endpoints/author/author.dto';
import { User } from '@endpoints/user/user.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepo: Repository<Author>,
  ) {}

  async create(payload: AuthorDto, initiator: User): Promise<Author> {
    const author = new Author();

    Object.assign(author, payload);

    author.creator = initiator;
    author.updator = initiator;


    return await this.save(author);
  }

  async read(id): Promise<Author> {
    const author = await this.authorRepo
      .createQueryBuilder('author')
      .where('author.id =:id', { id })
      .leftJoinAndSelect('author.creator', 'creator')
      .leftJoinAndSelect('author.updator', 'updator')
      .getOne();

    if (!author || !Object.keys(author).length) {
      const errorMessage = `Author Not Found`;
      throw new NotFoundException(errorMessage);
    }

    return author;
  }

  async getAuthor(): Promise<Author> {
    const author = await this.authorRepo
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.creator', 'creator')
      .leftJoinAndSelect('author.updator', 'updator')
      .getOne();

    if (!author || !Object.keys(author).length) {
      const errorMessage = `Author Not Found`;
      throw new NotFoundException(errorMessage);
    }

    return author;
  }

  async update(id, payload: AuthorDto, initiator: User): Promise<Author> {
    const author: Author = await this.read(id);

    Object.assign(author, payload);
    author.updator = initiator;

    return await this.authorRepo.save(author);
  }


  async save(author: Author): Promise<Author> {
    try {
      return await this.authorRepo.save(author);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Author Exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
