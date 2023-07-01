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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/User/user.interface';
import { RoleGuard } from 'src/Role/role.guard';
import { DeleteResult } from 'typeorm';
import { Publication } from './publication.entity';
import { PublicationDto } from './publication.dto';
import { PublicationService } from './publication.service';

@ApiTags('Publication endpoints')
@Controller('publications')
@ApiBearerAuth()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard)
  async getPublications(@Res() res: Response): Promise<Response> {
    const result: Publication[] | null =
      await this.publicationService.getPublications({
        relations: {
          Publisher: true,
          Tags: true,
          Reviews: true,
        },
      });
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticateGuard)
  async getPublication(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: Publication | null =
      await this.publicationService.getPublication({
        where: { ID: id },
        relations: {
          Publisher: true,
          Tags: true,
          Reviews: true,
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
  async createPublication(
    @Body() publication: PublicationDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (publication) {
      const result: Publication | null =
        await this.publicationService.createPublication(publication);
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
  async updatePublication(
    @Param('id') id: string,
    @Body() publication: PublicationDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (publication) {
      const result: Publication | null =
        await this.publicationService.createPublication(publication, id);
      if (!result) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
      return res.status(HttpStatus.OK).json(result);
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async deletePublication(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DeleteResult =
      await this.publicationService.deletePublication({
        ID: id,
      });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
