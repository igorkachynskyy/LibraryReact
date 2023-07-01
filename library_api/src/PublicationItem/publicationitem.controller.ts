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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { PublicationItemService } from './publicationitem.service';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { PublicationItem } from './publicationitem.entity';
import { Response } from 'express';
import { RoleGuard } from 'src/Role/role.guard';
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/User/user.interface';
import { PublicationItemDto } from './publicationitem.dto';
import { DeleteResult } from 'typeorm';

@Controller('publication-items')
@ApiBearerAuth()
@ApiTags('PublicationItem endpoints')
export class PublicationItemController {
  constructor(
    private readonly publicationItemService: PublicationItemService,
  ) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard)
  async getPublicationItems(@Res() res: Response): Promise<Response> {
    const result: PublicationItem[] | null =
      await this.publicationItemService.getPublicationItems({
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
  async getPublicationItem(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: PublicationItem | null =
      await this.publicationItemService.getPublicationItem({
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
  async createPublicationItem(
    @Body() publicationItem: PublicationItemDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (publicationItem) {
      const result: PublicationItem | null =
        await this.publicationItemService.createPublicationItem(
          publicationItem,
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
  async updatePublicationItem(
    @Param('id') id: string,
    @Body() publicationItem: PublicationItemDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (publicationItem) {
      const result: PublicationItem | null =
        await this.publicationItemService.createPublicationItem(
          publicationItem,
          id,
        );
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
  async deletePublicationItem(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DeleteResult =
      await this.publicationItemService.deletePublicationItem({
        ID: id,
      });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
