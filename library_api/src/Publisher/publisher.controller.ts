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
import { PublisherService } from './publisher.service';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { Response } from 'express';
import { Publisher } from './publisher.entity';
import { RoleGuard } from 'src/Role/role.guard';
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/User/user.interface';
import { PublisherDto } from './publisher.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Publisher endpoints')
@Controller('publishers')
@ApiBearerAuth()
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard)
  async getPublishers(@Res() res: Response): Promise<Response> {
    const result: Publisher[] | null =
      await this.publisherService.getPublishers({
        relations: { PublicationItems: true },
      });
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticateGuard)
  async getPublisher(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: Publisher | null = await this.publisherService.getPublisher({
      where: {
        ID: id,
      },
      relations: { PublicationItems: true },
    });

    if (result) {
      return res.status(HttpStatus.OK).json(result);
    }
    return res.status(HttpStatus.NOT_FOUND).send();
  }

  @Post()
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async createPublisher(
    @Body() publisher: PublisherDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (publisher) {
      const result: Publisher | null =
        await this.publisherService.createPublisher(publisher);
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
  async updatePublisher(
    @Param('id') id: string,
    @Body() publisher: PublisherDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (publisher) {
      const result: Publisher | null =
        await this.publisherService.createPublisher(publisher, id);
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
  async deletePublisher(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DeleteResult = await this.publisherService.deletePublisher({
      ID: id,
    });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
