import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/User/user.entity';
import { LibraryItem } from './libraryitem.entity';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { LibraryItemController } from './libraryitem.controller';
import { LibraryItemService } from './libraryitem.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, LibraryItem, PublicationItem])],
  controllers: [LibraryItemController],
  providers: [LibraryItemService],
})
export class LibraryItemModule {}
