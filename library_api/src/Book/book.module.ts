import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { LibraryItem } from 'src/LibraryItem/libraryitem.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Tag } from 'src/Tag/tag.entity';
import { Review } from 'src/Review/review.entity';
import { Author } from 'src/Author/author.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      LibraryItem,
      Publisher,
      Tag,
      Review,
      Author,
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
