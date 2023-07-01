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
import { EBookService } from './ebook.service';
import { EBook } from './ebook.entity';
import { EBookDto } from './ebook.dto';

@ApiTags('EBook endpoints')
@Controller('e-books')
@ApiBearerAuth()
export class EBookController {
  constructor(private readonly bookService: EBookService) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard)
  async getEBookss(@Res() res: Response): Promise<Response> {
    const result: EBook[] | null = await this.bookService.getEBooks({
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
  async getEBooks(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: EBook | null = await this.bookService.getEBook({
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
  async createEBooks(
    @Body() ebook: EBookDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (ebook) {
      const result: EBook | null = await this.bookService.createEBook(ebook);
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
  async updateEBooks(
    @Param('id') id: string,
    @Body() ebook: EBookDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (ebook) {
      const result: EBook | null = await this.bookService.createEBook(
        ebook,
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
  async deleteEBooks(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DeleteResult = await this.bookService.deleteEBook({
      ID: id,
    });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
