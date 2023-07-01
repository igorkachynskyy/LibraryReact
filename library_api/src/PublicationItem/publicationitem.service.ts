import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  Repository,
  In,
  FindOptionsWhere,
  DeleteResult,
} from 'typeorm';
import { PublicationItem } from './publicationitem.entity';
import { LibraryItem } from 'src/LibraryItem/libraryitem.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Tag } from 'src/Tag/tag.entity';
import { Review } from 'src/Review/review.entity';
import { PublicationItemDto } from './publicationitem.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PublicationItemService {
  constructor(
    @InjectRepository(PublicationItem)
    private readonly publicationItemRepository: Repository<PublicationItem>,
    @InjectRepository(LibraryItem)
    private readonly libraryItemRepository: Repository<LibraryItem>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async getPublicationItem(
    query: FindManyOptions<PublicationItem>,
  ): Promise<PublicationItem | null> {
    return this.publicationItemRepository.findOne(query);
  }

  async createPublicationItem(
    publicationItem: PublicationItemDto,
    publicationItemID: string = uuid(),
  ): Promise<PublicationItem | null> {
    const _publicationItem = new PublicationItem();
    _publicationItem.ID = publicationItemID;
    _publicationItem.Title = publicationItem.Title;
    _publicationItem.DatePublished = publicationItem.DatePublished;
    _publicationItem.Language = publicationItem.Language;
    _publicationItem.Publisher = await this.publisherRepository.findOne({
      where: {
        ID: publicationItem.PublisherID as string,
      },
    });
    publicationItem.TagsID &&
      (_publicationItem.Tags = await this.tagRepository.find({
        where: {
          ID: In(publicationItem.TagsID as string[]),
        },
      }));
    _publicationItem.Preview = publicationItem.Preview;
    publicationItem.ReviewsID &&
      (_publicationItem.Reviews = await this.reviewRepository.find({
        where: {
          ID: In(publicationItem.ReviewsID as string[]),
        },
      }));
    _publicationItem.Rating = publicationItem.Rating;
    _publicationItem.Price = publicationItem.Price;
    _publicationItem.Pages = publicationItem.Pages;

    return this.publicationItemRepository.save(_publicationItem);
  }

  async getPublicationItems(
    query: FindManyOptions<PublicationItem>,
  ): Promise<PublicationItem[] | null> {
    return this.publicationItemRepository.find(query);
  }

  async deletePublicationItem(
    query: FindOptionsWhere<PublicationItem>,
  ): Promise<DeleteResult> {
    return this.publicationItemRepository.delete(query);
  }
}
