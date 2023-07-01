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
import { JournalService } from './journal.service';
import { Journal } from './journal.entity';
import { JournalDto } from './journal.dto';

@ApiTags('Journal endpoints')
@Controller('journals')
@ApiBearerAuth()
export class JournalController {
  constructor(private readonly bookService: JournalService) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard)
  async getJournals(@Res() res: Response): Promise<Response> {
    const result: Journal[] | null = await this.bookService.getJournals({
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
  async getJournal(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: Journal | null = await this.bookService.getJournal({
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
  async createJournal(
    @Body() journal: JournalDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (journal) {
      const result: Journal | null = await this.bookService.createJournal(
        journal,
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
  async updateJournal(
    @Param('id') id: string,
    @Body() journal: JournalDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (journal) {
      const result: Journal | null = await this.bookService.createJournal(
        journal,
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
  async deleteJournal(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DeleteResult = await this.bookService.deleteJournal({
      ID: id,
    });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
