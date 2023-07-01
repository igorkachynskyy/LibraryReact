import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './publication.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Tag } from 'src/Tag/tag.entity';
import { Review } from 'src/Review/review.entity';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publication, Publisher, Tag, Review])],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
