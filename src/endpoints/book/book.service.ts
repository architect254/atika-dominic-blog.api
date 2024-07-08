import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Book } from '@endpoints/book/book.entity';
import { BookDto } from '@endpoints/book/book.dto';

import { User } from '@endpoints/user/user.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async create(payload: BookDto, initiator: User): Promise<Book> {
    const book = new Book();

    Object.assign(book, payload);

    book.creator = initiator;
    book.updator = initiator;


    return await this.save(book);
  }

  async read(id): Promise<Book> {
    const book = await this.bookRepo
      .createQueryBuilder('book')
      .where('book.id =:id', { id })
      .leftJoinAndSelect('book.creator', 'creator')
      .leftJoinAndSelect('book.updator', 'updator')
      .getOne();

    if (!book || !Object.keys(book).length) {
      const errorMessage = `Book Not Found`;
      throw new NotFoundException(errorMessage);
    }

    return book;
  }

  async readAll(page: number, pageSize: number): Promise<Book[]> {
    const skip: number = pageSize * (page - 1);

    return await this.bookRepo.find({ skip, take: pageSize });
  }

  async update(id, payload: BookDto, initiator: User): Promise<Book> {
    const book: Book = await this.read(id);

    Object.assign(book, payload);
    book.updator = initiator;

    return await this.bookRepo.save(book);
  }

  async drop(id): Promise<void> {
    const book: Book = await this.read(id);
    const result = await this.bookRepo.remove(book);

    if (!result) {
      const errorMessage = `Operation Failed:DELETE`;
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async save(book: Book): Promise<Book> {
    try {
      return await this.bookRepo.save(book);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Book Exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
