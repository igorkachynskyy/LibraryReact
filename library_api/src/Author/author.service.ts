import { Injectable } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { Book } from 'src/Book/book.entity';
import { v4 as uuid } from 'uuid';
import { AuthorDto } from './author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAuthor(query: FindManyOptions<Author>): Promise<Author | null> {
    return this.authorRepository.findOne(query);
  }

  async getAuthors(query: FindManyOptions<Author>): Promise<Author[] | null> {
    return this.authorRepository.find(query);
  }

  async createAuthor(
    author: AuthorDto,
    authorID: string = uuid(),
  ): Promise<Author | null> {
    const _author = new Author();
    _author.ID = authorID;
    _author.Name = author.Name;
    _author.Surename = author.Surename;
    _author.Rate = author.Rate;
    author.BooksID &&
      (_author.Books = (await this.bookRepository.find({
        where: { ID: In(author.BooksID) },
      })) as Book[]);
    return this.authorRepository.save(_author);
  }

  async deleteAuthor(query: FindOptionsWhere<Author>): Promise<DeleteResult> {
    return this.authorRepository.delete(query);
  }
}
