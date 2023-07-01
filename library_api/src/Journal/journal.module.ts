import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalController } from './journal.controller';
import { Journal } from './journal.entity';
import { JournalService } from './journal.service';
import { Module } from '@nestjs/common';
import { LibraryItem } from 'src/LibraryItem/libraryitem.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Tag } from 'src/Tag/tag.entity';
import { Review } from 'src/Review/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Journal, LibraryItem, Publisher, Tag, Review]),
  ],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
