import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, PublicationItem])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
