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
import { TagService } from './tag.service';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { Response } from 'express';
import { Tag } from './tag.entity';
import { RoleGuard } from 'src/Role/role.guard';
import { Role } from 'src/User/user.interface';
import { TagDto } from './tag.dto';
import { Roles } from 'src/Roles/roles.decorator';
import { DeleteResult } from 'typeorm';

@ApiTags('Tag endpoints')
@Controller('tags')
@ApiBearerAuth()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard)
  async getTags(@Res() res: Response): Promise<Response> {
    const result: Tag[] | null = await this.tagService.getTags({
      relations: { PublicationItems: true },
    });
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticateGuard)
  async getTag(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: Tag | null = await this.tagService.getTag({
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
  async createTag(
    @Body() tag: TagDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (tag) {
      const result: Tag | null = await this.tagService.createTag(tag);
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
  async updateTag(
    @Param('id') id: string,
    @Body() tag: TagDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (tag) {
      const result: Tag | null = await this.tagService.createTag(tag, id);
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
  async deleteTag(@Param('id') id: string, @Res() res: Response) {
    const result: DeleteResult = await this.tagService.deleteTags({
      ID: id,
    });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
