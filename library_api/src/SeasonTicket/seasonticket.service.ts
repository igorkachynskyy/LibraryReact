import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeasonTicket } from './seasonticket.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { SeasonTicketDto } from './seasonticket.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SeasonTicketService {
  constructor(
    @InjectRepository(SeasonTicket)
    private readonly repository: Repository<SeasonTicket>,
  ) {}

  public async GetSeasonTicket(query: object): Promise<SeasonTicket | null> {
    return this.repository.findOne(query);
  }

  public async GetSeasonTickets(query: object): Promise<SeasonTicket[] | null> {
    return this.repository.find(query);
  }

  public async CreateSeasonTicket(
    seasonTicket: SeasonTicketDto,
  ): Promise<SeasonTicket | null> {
    const _seasonTicket: SeasonTicket = {
      ID: uuid(),
      ...seasonTicket,
    } as SeasonTicket;
    return this.repository.save(_seasonTicket);
  }

  public async UpdateSeasonTicket(
    seasonTicket: SeasonTicket,
  ): Promise<InsertResult> {
    return this.repository.upsert(seasonTicket, ['ID']);
  }

  public async DeleteSeasonTickets(query: object): Promise<DeleteResult> {
    return this.repository.delete(query);
  }
}
