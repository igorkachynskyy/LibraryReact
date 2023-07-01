import {
  Controller,
  Get,
  Delete,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('SeasonTicket endpoints')
@ApiBearerAuth()
@Controller('tickets')
export class SeasonTicketController {
  constructor(private readonly seasonTicketService: SeasonTicketService) {}

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Visitor)
  @Get('my-ticket')
  async getSeasonTicket(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const user: User | undefined = req.user as User;
    if (!user) return res.status(HttpStatus.UNAUTHORIZED);
    const seasonTicket: SeasonTicket | null =
      await this.seasonTicketService.GetSeasonTicket({
        where: {
          User: {
            ID: user.ID,
          },
        },
      });
    if (seasonTicket) {
      res.status(HttpStatus.OK).json({ ticket: seasonTicket });
    }
    return res.status(HttpStatus.NOT_FOUND).send();
  }

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  @Get()
  async getSeasonTickets(@Res() res: Response): Promise<Response> {
    const tickets: SeasonTicket[] | null =
      await this.seasonTicketService.GetSeasonTickets({
        relations: { User: true },
      });
    return res.status(HttpStatus.OK).json({ tickets: tickets });
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
        ID: id,
      });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
