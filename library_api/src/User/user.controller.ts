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
import { UUID } from 'crypto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User endpoints')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  @Get()
  async getUsers(@Res() res: Response): Promise<Response> {
    const users: User[] | null = await this.userService.GetUsers({});

    return res.status(HttpStatus.OK).json({ users: users });
  }

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
  @Post()
  async createUser(
    @Res() res: Response,
    @Body() user: UserDto,
  ): Promise<Response> {
    const result: User | null = await this.userService.CreateUser(
      user as UserDto,
    );
    if (result) {
      return res.status(HttpStatus.CREATED).json({ user: result });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }

  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() user: UserDto,
  ): Promise<Response> {
    user = user as UserDto;

    const result: User | null = await this.userService.CreateUser(user, id);

    if (result) {
      return res.status(HttpStatus.OK).json({ user: result });
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
      ID: id as UUID,
    });
    if (resut.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
