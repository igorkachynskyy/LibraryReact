import {
  Controller,
  Get,
  Delete,
  Put,
  HttpStatus,
  Res,
  Param,
  Req,
  UseGuards,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from './user.interface';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { RoleGuard } from 'src/Role/role.guard';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { DeleteResult, InsertResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  @Get(':id')
  async getUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const user: User | null = await this.userService.GetUser({
      where: { ID: id },
    });
    if (user) {
      return res.status(HttpStatus.OK).json({ user: user });
    }
    return res.status(HttpStatus.NOT_FOUND).send();
  }

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  @Get()
  async getUsers(@Res() res: Response, @Query() query: any): Promise<Response> {
    const [skip, take] = (query.selectionParams as string)
      .split('-')
      .map((x) => Number.parseInt(x));
    if (Number.isNaN(skip) || Number.isNaN(take)) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
    const users: User[] | null = await this.userService.GetUsers({
      skip: skip,
      take: take,
    });
    if (users) {
      return res.status(HttpStatus.OK).json({ users: users });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updateUser(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() res: Response,
    @Body() user: UserDto,
  ): Promise<Response> {
    user = req.body.user as UserDto;
    const _user: User = { ID: id, ...user };
    const result: InsertResult = await this.userService.UpdateUser(_user);

    if (result.raw.affectedRows > 0) {
      return res.status(HttpStatus.OK).json({ user: _user });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const resut: DeleteResult = await this.userService.DeleteUsers({
      where: { ID: id },
    });
    if (resut.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  @Post()
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result: User | null = await this.userService.CreateUser(
      req.body.user as UserDto,
    );
    if (result) {
      return res.status(HttpStatus.CREATED).json({ user: result });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
