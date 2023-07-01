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
import { Publisher } from 'src/Publisher/publisher.entity';
import { Tag } from 'src/Tag/tag.entity';
import { Review } from 'src/Review/review.entity';
import { Publication } from './publication.entity';
import { PublicationDto } from './publication.dto';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async getPublication(
    query: FindManyOptions<Publication>,
  ): Promise<Publication | null> {
    return this.publicationRepository.findOne(query);
  }

  async getPublications(
    query: FindManyOptions<Publication>,
  ): Promise<Publication[] | null> {
    return this.publicationRepository.find(query);
  }

  async createPublication(
    publication: PublicationDto,
    bookID: string = uuid(),
  ): Promise<Publication | null> {
    const _publication = new Publication();
    _publication.ID = bookID;
    _publication.Title = publication.Title;
    _publication.DatePublished = publication.DatePublished;
    _publication.Language = publication.Language;
    _publication.Publisher = await this.publisherRepository.findOne({
      where: {
        ID: publication.PublisherID as string,
      },
    });
    publication.TagsID &&
      (_publication.Tags = await this.tagRepository.find({
        where: {
          ID: In(publication.TagsID as string[]),
        },
      }));
    _publication.Preview = publication.Preview;
    publication.ReviewsID &&
      (_publication.Reviews = await this.reviewRepository.find({
        where: {
          ID: In(publication.ReviewsID as string[]),
        },
      }));
    _publication.Rating = publication.Rating;
    _publication.Price = publication.Price;
    _publication.Pages = publication.Pages;

    return this.publicationRepository.save(_publication);
  }

  async deletePublication(
    query: FindOptionsWhere<Publication>,
  ): Promise<DeleteResult> {
    return this.publicationRepository.delete(query);
  }
}
