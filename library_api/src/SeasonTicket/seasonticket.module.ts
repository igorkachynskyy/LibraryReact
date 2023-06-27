import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonTicket } from './seasonticket.entity';
import { SeasonTicketController } from './seasonticket.controller';
import { SeasonTicketService } from './seasonticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeasonTicket])],
  controllers: [SeasonTicketController],
  providers: [SeasonTicketService],
})
export class SeasonTicketNodule {}
