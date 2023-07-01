import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { Publisher } from './publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { PublisherDto } from './publisher.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private readonly pulisherRepository: Repository<Publisher>,
    @InjectRepository(PublicationItem)
    private readonly publicationItemRepository: Repository<PublicationItem>,
  ) {}

  async getPublisher(
    query: FindManyOptions<Publisher>,
  ): Promise<Publisher | null> {
    return this.pulisherRepository.findOne(query);
  }

  async getPublishers(
    query: FindManyOptions<Publisher>,
  ): Promise<Publisher[] | null> {
    return this, this.pulisherRepository.find(query);
  }

  async createPublisher(
    publisher: PublisherDto,
    publisherID: string = uuid(),
  ): Promise<Publisher | null> {
    const _publisher = new Publisher();
    _publisher.ID = publisherID;
    _publisher.Name = publisher.Name;
    publisher.PublicationItemsID &&
      (_publisher.PublicationItems = await this.publicationItemRepository.find({
        where: {
          ID: In(publisher.PublicationItemsID as string[]),
        },
      }));
    return this.pulisherRepository.save(_publisher);
  }

  async deletePublisher(
    query: FindOptionsWhere<Publisher>,
  ): Promise<DeleteResult> {
    return this.pulisherRepository.delete(query);
  }
}
