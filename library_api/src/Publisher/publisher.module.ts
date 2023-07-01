import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './publisher.entity';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher, PublicationItem])],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {}
