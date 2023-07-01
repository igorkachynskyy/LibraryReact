import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/Author/author.entity';
import { LibraryItem } from 'src/LibraryItem/libraryitem.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Review } from 'src/Review/review.entity';
import { Tag } from 'src/Tag/tag.entity';
import { EBookController } from './ebook.controller';
import { EBookService } from './ebook.service';
import { EBook } from './ebook.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EBook,
      LibraryItem,
      Publisher,
      Tag,
      Review,
      Author,
    ]),
  ],
  controllers: [EBookController],
  providers: [EBookService],
})
export class EBookModule {}
