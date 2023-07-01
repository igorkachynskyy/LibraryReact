import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { BookDto } from './book.dto';
import { v4 as uuid } from 'uuid';
import { LibraryItem } from 'src/LibraryItem/libraryitem.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Tag } from 'src/Tag/tag.entity';
import { Review } from 'src/Review/review.entity';
import { Author } from 'src/Author/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(LibraryItem)
    private readonly libraryItemRepository: Repository<LibraryItem>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async getBook(query: FindManyOptions<Book>): Promise<Book | null> {
    return this.bookRepository.findOne(query);
  }

  async getBooks(query: FindManyOptions<Book>): Promise<Book[] | null> {
    return this.bookRepository.find(query);
  }

  async createBook(
    book: BookDto,
    bookID: string = uuid(),
  ): Promise<Book | null> {
    const _book = new Book();
    _book.ID = bookID;
    _book.Title = book.Title;
    _book.DatePublished = book.DatePublished;
    _book.Language = book.Language;
    _book.Publisher = await this.publisherRepository.findOne({
      where: {
        ID: book.PublisherID as string,
      },
    });
    book.TagsID &&
      (_book.Tags = await this.tagRepository.find({
        where: {
          ID: In(book.TagsID as string[]),
        },
      }));
    _book.Preview = book.Preview;
    book.ReviewsID &&
      (_book.Reviews = await this.reviewRepository.find({
        where: {
          ID: In(book.ReviewsID as string[]),
        },
      }));
    _book.Rating = book.Rating;
    _book.Price = book.Price;
    _book.Pages = book.Pages;
    _book.Authors = await this.authorRepository.find({
      where: {
        ID: In(book.AuthorsID),
      },
    });
    _book.ImagePath = book.ImagePath;
    _book.Genre = book.Genre;

    return this.bookRepository.save(_book);
  }

  async deleteBook(query: FindOptionsWhere<Book>): Promise<DeleteResult> {
    return this.bookRepository.delete(query);
  }
}
