import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { TagDto } from './tag.dto';
import { v4 as uuid } from 'uuid';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(PublicationItem)
    private readonly publicationItemRepository: Repository<PublicationItem>,
  ) {}

  async getTag(query: FindManyOptions<Tag>): Promise<Tag | null> {
    return this.tagRepository.findOne(query);
  }

  async getTags(query: FindManyOptions<Tag>): Promise<Tag[] | null> {
    return this.tagRepository.find(query);
  }

  async createTag(tag: TagDto, tagID: string = uuid()): Promise<Tag | null> {
    const _tag = new Tag();
    _tag.ID = tagID;
    _tag.Description = tag.Description;
    tag.PublicationItemsID &&
      (_tag.PublicationItems = await this.publicationItemRepository.find({
        where: {
          ID: In(tag.PublicationItemsID as string[]),
        },
      }));
    return this.tagRepository.save(_tag);
  }

  async deleteTags(query: FindOptionsWhere<Tag>): Promise<DeleteResult> {
    return this.tagRepository.delete(query);
  }
}
