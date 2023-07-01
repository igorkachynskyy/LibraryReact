import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Review } from './review.entity';
import { ReviewDto } from './review.dto';
import { v4 as uuid } from 'uuid';
import { User } from 'src/User/user.entity';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PublicationItem)
    private readonly publicationItemRepository: Repository<PublicationItem>,
  ) {}

  async getReview(query: FindManyOptions<Review>): Promise<Review | null> {
    return this.reviewRepository.findOne(query);
  }

  async getReviews(query: FindManyOptions<Review>): Promise<Review[] | null> {
    return this.reviewRepository.find(query);
  }

  async createReview(
    review: ReviewDto,
    reviewID: string = uuid(),
  ): Promise<Review | null> {
    const _review = new Review();
    _review.ID = reviewID;
    _review.Message = review.Message;
    _review.Rating = review.Rating;
    _review.User = (await this.userRepository.findOne({
      where: { ID: review.UserID },
    })) as User;
    _review.PublicationItem = (await this.publicationItemRepository.findOne({
      where: { ID: review.PublicationItemID },
    })) as PublicationItem;
    return this.reviewRepository.save(_review);
  }

  async deleteReviews(query: FindOptionsWhere<Review>): Promise<DeleteResult> {
    return this.reviewRepository.delete(query);
  }
}
