import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticateGuard } from 'src/Authentication/jwt.guard';
import { RoleGuard } from 'src/Role/role.guard';
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/User/user.interface';
import { LibraryItemService } from './libraryitem.service';
import { Request, Response, response } from 'express';
import { LibraryItem } from './libraryitem.entity';
import { LibraryItemDto } from './libraryitem.dto';
import { DeleteResult } from 'typeorm';
import { UUID } from 'crypto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { User } from 'src/User/user.entity';
import { UserModule } from 'src/User/user.module';
import { get } from 'http';

@ApiTags('LibraryItem endpoints')
@ApiBearerAuth()
@Controller('library-items')
export class LibraryItemController {
  constructor(private readonly libraryItemService: LibraryItemService) {}

  @Get()
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async getLibraryItems(@Res() res: Response): Promise<Response> {
    const libraryItems: LibraryItem[] | null =
      await this.libraryItemService.getLibraryItems({
        relations: { PublicationItem: true, User: true },
      });
    return res.status(HttpStatus.OK).json({ libraryItems: libraryItems });
  }

  @Get('my-library-items')
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Visitor)
  async getPersonalLibraryItems(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const user: User = req.body.user as User;
    const result: LibraryItem[] | null =
      await this.libraryItemService.getLibraryItems({
        where: {
          User: {
            ID: user.ID,
          },
        },
        relations: { PublicationItem: true },
      });
    return res.status(HttpStatus.OK).json(result);
  }

  @Post()
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async createLibraryItem(
    @Body() libraryItem: LibraryItemDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const result: LibraryItem | null =
        await this.libraryItemService.createLibraryItem(libraryItem);
      if (result) {
        return res.status(HttpStatus.CREATED).json(result);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async updateLibraryItem(
    @Param('id') id: string,
    @Body() libraryItem: LibraryItemDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const result: LibraryItem | null =
        await this.libraryItemService.createLibraryItem(libraryItem, id);
      if (result) {
        return res.status(HttpStatus.OK).json(result);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticateGuard, RoleGuard)
  @Roles(Role.Admin, Role.Manager)
  async deleteLibraryItem(@Param('id') id: string, @Res() res: Response) {
    const result: DeleteResult =
      await this.libraryItemService.deleteLibraryItems({ ID: id as UUID });
    if (result.affected) {
      return res.status(HttpStatus.OK).json({ message: 'Success!' });
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
