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
import { BookService } from './book.service';
import { Response } from 'express';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { Book } from './book.entity';
import { BookDto } from './book.dto';
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/User/user.interface';
import { RoleGuard } from 'src/Role/role.guard';
import { DeleteResult } from 'typeorm';

@ApiTags('Book endpoints')
@Controller('books')
@ApiBearerAuth()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard)
  async getBooks(@Res() res: Response): Promise<Response> {
    const result: Book[] | null = await this.bookService.getBooks({
      relations: {
        Publisher: true,
        Tags: true,
        Reviews: true,
        Authors: true,
      },
    });
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticateGuard)
  async getBook(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: Book | null = await this.bookService.getBook({
      where: { ID: id },
      relations: {
        Publisher: true,
        Tags: true,
        Reviews: true,
        Authors: true,
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
  async createBook(
    @Body() book: BookDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (book) {
      const result: Book | null = await this.bookService.createBook(book);
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
  async updateBook(
    @Param('id') id: string,
    @Body() book: BookDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (book) {
      const result: Book | null = await this.bookService.createBook(book, id);
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
  async deleteBook(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DeleteResult = await this.bookService.deleteBook({
      ID: id,
    });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
