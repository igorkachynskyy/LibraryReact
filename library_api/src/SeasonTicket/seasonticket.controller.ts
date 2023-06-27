import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  Res,
  Req,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { SeasonTicketService } from './seasonticket.service';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { RoleGuard } from 'src/Role/role.guard';
import { Role } from 'src/User/user.interface';
import { Request, Response } from 'express';
import { Roles } from 'src/Roles/roles.decorator';
import { User } from 'src/User/user.entity';
import { SeasonTicket } from './seasonticket.entity';
import { DeleteResult } from 'typeorm';

@Controller('tickets')
export class SeasonTicketController {
  constructor(private readonly seasonTicketService: SeasonTicketService) {}

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Visitor)
  @Get('myticket')
  async getSeasonTicket(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const user: User | undefined = req.user as User;
    if (!user) return res.status(HttpStatus.UNAUTHORIZED);
    const seasonTicket: SeasonTicket | null =
      await this.seasonTicketService.GetSeasonTicket({
        where: { ID: user.ID },
      });
    if (seasonTicket) {
      console.log(seasonTicket);
      res.status(HttpStatus.OK).json({ ticket: seasonTicket });
    }
    return res.status(HttpStatus.NOT_FOUND).send();
  }

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  @Get(':selectionParams')
  async getSeasonTickets(
    @Res() res: Response,
    @Param() selectionParams: string,
  ): Promise<Response> {
    const [skip, take] = selectionParams
      .split('-')
      .map((x) => Number.parseInt(x));
    if (Number.isNaN(skip) || Number.isNaN(take)) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
    const tickets: SeasonTicket[] | null =
      await this.seasonTicketService.GetSeasonTickets({
        skip: skip,
        take: take,
      });
    if (tickets) {
      return res.status(HttpStatus.OK).json({ tickets: tickets });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }

  //For the post endpoint need more info.

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  @Delete(':id')
  async deleteSeasonTicket(
    @Param() id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DeleteResult =
      await this.seasonTicketService.DeleteSeasonTickets({
        where: { ID: id },
      });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
