import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { LibraryItem } from 'src/LibraryItem/libraryitem.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Tag } from 'src/Tag/tag.entity';
import { Review } from 'src/Review/review.entity';
import { Author } from 'src/Author/author.entity';
import { EBook } from './ebook.entity';
import { EBookDto } from './ebook.dto';

@Injectable()
export class EBookService {
  constructor(
    @InjectRepository(EBook)
    private readonly ebookRepository: Repository<EBook>,
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

  async getEBook(query: FindManyOptions<EBook>): Promise<EBook | null> {
    return this.ebookRepository.findOne(query);
  }

  async getEBooks(query: FindManyOptions<EBook>): Promise<EBook[] | null> {
    return this.ebookRepository.find(query);
  }

  async createEBook(
    ebook: EBookDto,
    bookID: string = uuid(),
  ): Promise<EBook | null> {
    const _ebook = new EBook();
    _ebook.ID = bookID;
    _ebook.Title = ebook.Title;
    _ebook.DatePublished = ebook.DatePublished;
    _ebook.Language = ebook.Language;
    _ebook.Publisher = await this.publisherRepository.findOne({
      where: {
        ID: ebook.PublisherID as string,
      },
    });
    ebook.TagsID &&
      (_ebook.Tags = await this.tagRepository.find({
        where: {
          ID: In(ebook.TagsID as string[]),
        },
      }));
    _ebook.Preview = ebook.Preview;
    ebook.ReviewsID &&
      (_ebook.Reviews = await this.reviewRepository.find({
        where: {
          ID: In(ebook.ReviewsID as string[]),
        },
      }));
    _ebook.Rating = ebook.Rating;
    _ebook.Price = ebook.Price;
    _ebook.Pages = ebook.Pages;
    _ebook.Authors = await this.authorRepository.find({
      where: {
        ID: In(ebook.AuthorsID),
      },
    });
    _ebook.ImagePath = ebook.ImagePath;
    _ebook.Genre = ebook.Genre;
    return this.ebookRepository.save(_ebook);
  }

  async deleteEBook(query: FindOptionsWhere<EBook>): Promise<DeleteResult> {
    return this.ebookRepository.delete(query);
  }
}
