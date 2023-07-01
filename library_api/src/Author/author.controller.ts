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
import { AuthorService } from './author.service';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { Author } from './author.entity';
import { Response } from 'express';
import { RoleGuard } from 'src/Role/role.guard';
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/User/user.interface';
import { AuthorDto } from './author.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Authors endpoints')
@Controller('authors')
@ApiBearerAuth()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard)
  async getAuthors(@Res() res: Response): Promise<Response> {
    const result: Author[] | null = await this.authorService.getAuthors({
      relations: { Books: true },
    });
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticateGuard)
  async getAuthor(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: Author | null = await this.authorService.getAuthor({
      where: { ID: id },
      relations: { Books: true },
    });
    if (result) {
      return res.status(HttpStatus.OK).json(result);
    }
    return res.status(HttpStatus.NOT_FOUND).send();
  }

  @Post()
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async createAuthor(
    @Body() author: AuthorDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (!author) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
    const result: Author | null = await this.authorService.createAuthor(author);
    if (!result) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }

    return res.status(HttpStatus.CREATED).json(result);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async updateAuthor(
    @Body() author: AuthorDto,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!author) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
    const result: Author | null = await this.authorService.createAuthor(
      author,
      id,
    );
    if (!result) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async deleteAuthor(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DeleteResult = await this.authorService.deleteAuthor({
      ID: id,
    });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST);
  }
}
