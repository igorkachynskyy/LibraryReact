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
import { Journal } from './journal.entity';
import { JournalDto } from './journal.dto';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private readonly journalRepository: Repository<Journal>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async getJournal(query: FindManyOptions<Journal>): Promise<Journal | null> {
    return this.journalRepository.findOne(query);
  }

  async getJournals(
    query: FindManyOptions<Journal>,
  ): Promise<Journal[] | null> {
    return this.journalRepository.find(query);
  }

  async createJournal(
    journal: JournalDto,
    bookID: string = uuid(),
  ): Promise<Journal | null> {
    const _journal = new Journal();
    _journal.ID = bookID;
    _journal.Title = journal.Title;
    _journal.DatePublished = journal.DatePublished;
    _journal.Language = journal.Language;
    _journal.Publisher = await this.publisherRepository.findOne({
      where: {
        ID: journal.PublisherID as string,
      },
    });
    journal.TagsID &&
      (_journal.Tags = await this.tagRepository.find({
        where: {
          ID: In(journal.TagsID as string[]),
        },
      }));
    _journal.Preview = journal.Preview;
    journal.ReviewsID &&
      (_journal.Reviews = await this.reviewRepository.find({
        where: {
          ID: In(journal.ReviewsID as string[]),
        },
      }));
    _journal.Rating = journal.Rating;
    _journal.Price = journal.Price;
    _journal.Pages = journal.Pages;
    _journal.ImagePath = journal.ImagePath;

    return this.journalRepository.save(_journal);
  }

  async deleteJournal(query: FindOptionsWhere<Journal>): Promise<DeleteResult> {
    return this.journalRepository.delete(query);
  }
}
