import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { Response } from 'express';
import { RoleGuard } from 'src/Role/role.guard';
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/User/user.interface';
import { DeleteResult } from 'typeorm';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { ReviewDto } from './review.dto';

@ApiTags('Review endpoints')
@Controller('reviews')
@ApiBearerAuth()
export class ReviewController {
  constructor(private readonly publisherService: ReviewService) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard)
  async getReviews(@Res() res: Response): Promise<Response> {
    const result: Review[] | null = await this.publisherService.getReviews({
      relations: {
        User: true,
        PublicationItem: true,
      },
    });
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticateGuard)
  async getReview(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: Review | null = await this.publisherService.getReview({
      where: {
        ID: id,
      },
      relations: {
        User: true,
        PublicationItem: true,
      },
    });

    if (result) {
      return res.status(HttpStatus.OK).json(result);
    }
    return res.status(HttpStatus.NOT_FOUND).send();
  }

  @Post()
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async createReview(
    @Body() review: ReviewDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (review) {
      const result: Review | null = await this.publisherService.createReview(
        review,
      );
      if (!result) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
      return res.status(HttpStatus.CREATED).json(result);
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }

  @Put(':id')
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async updateReview(
    @Param('id') id: string,
    @Body() review: ReviewDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (review) {
      const result: Review | null = await this.publisherService.createReview(
        review,
        id,
      );
      if (!result) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
      return res.status(HttpStatus.CREATED).json(result);
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async deleteReview(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DeleteResult = await this.publisherService.deleteReviews({
      ID: id,
    });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
