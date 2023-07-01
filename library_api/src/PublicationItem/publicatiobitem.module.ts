import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationItem } from './publicationitem.entity';
import { Tag } from 'src/Tag/tag.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Review } from 'src/Review/review.entity';
import { PublicationItemController } from './publicationitem.controller';
import { PublicationItemService } from './publicationitem.service';
import { LibraryItem } from 'src/LibraryItem/libraryitem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PublicationItem,
      Tag,
      Publisher,
      Review,
      LibraryItem,
    ]),
  ],
  controllers: [PublicationItemController],
  providers: [PublicationItemService],
})
export class PublicationItemModule {}
