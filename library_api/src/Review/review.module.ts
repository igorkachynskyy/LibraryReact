import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { User } from 'src/User/user.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, PublicationItem, User])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
