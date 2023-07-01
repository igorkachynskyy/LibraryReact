import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  InsertResult,
  Repository,
} from 'typeorm';
import { LibraryItem } from './libraryitem.entity';
import { LibraryItemDto } from './libraryitem.dto';
import { User } from 'src/User/user.entity';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { v4 as uuid } from 'uuid';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LibraryItemService {
  constructor(
    @InjectRepository(LibraryItem)
    private readonly libraryItemRepository: Repository<LibraryItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PublicationItem)
    private readonly publicationItemRepository: Repository<PublicationItem>,
  ) {}

  async getLibraryItem(
    query: FindManyOptions<LibraryItem>,
  ): Promise<LibraryItem | null> {
    return this.libraryItemRepository.findOne(query);
  }

  async createLibraryItem(
    libraryItem: LibraryItemDto,
    libraryItemID: string = uuid(),
  ): Promise<LibraryItem | null> {
    const { IssueDate, IsReturned, Deadline, PublicationItemID, UserID } = {
      ...libraryItem,
    };
    const publicationitem: PublicationItem | null =
      await this.publicationItemRepository.findOne({
        where: { ID: PublicationItemID as UUID },
      });
    const user: User | null = await this.userRepository.findOne({
      where: { ID: UserID as UUID },
    });
    if (!publicationitem || !user) {
      throw new NotFoundException('User or publication item not found.');
    }
    const _libraryItem: LibraryItem = {
      ID: libraryItemID as UUID,
      IssueDate: IssueDate,
      IsReturned: IsReturned,
      Deadline: Deadline,
      PublicationItem: publicationitem,
      User: user,
    } as LibraryItem;

    return this.libraryItemRepository.save(_libraryItem);
  }

  async getLibraryItems(
    query: FindManyOptions<LibraryItem>,
  ): Promise<LibraryItem[] | null> {
    return this.libraryItemRepository.find(query);
  }

  async deleteLibraryItems(
    query: FindOptionsWhere<LibraryItem>,
  ): Promise<DeleteResult> {
    return this.libraryItemRepository.delete(query);
  }
}
