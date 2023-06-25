import {
  Controller,
  Get,
  HttpStatus,
  Injectable,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from './user.interface';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.GetUser({ where: { ID: id } });
    if (user) {
      return res.status(HttpStatus.OK).json({ user });
    }
    return res.status(HttpStatus.NOT_FOUND);
  }
}
