import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeasonTicket } from './seasonticket.entity';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  InsertResult,
  Repository,
} from 'typeorm';
import { SeasonTicketDto } from './seasonticket.dto';
import { v4 as uuid } from 'uuid';
import { UUID } from 'crypto';
import { User } from 'src/User/user.entity';

@Injectable()
export class SeasonTicketService {
  constructor(
    @InjectRepository(SeasonTicket)
    private readonly seasonTicketRepository: Repository<SeasonTicket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async GetSeasonTicket(
    query: FindManyOptions<SeasonTicket>,
  ): Promise<SeasonTicket | null> {
    return this.seasonTicketRepository.findOne(query);
  }

  public async GetSeasonTickets(
    query: FindManyOptions<SeasonTicket>,
  ): Promise<SeasonTicket[] | null> {
    return this.seasonTicketRepository.find(query);
  }

  public async CreateSeasonTicket(
    seasonTicket: SeasonTicketDto,
    seasonTicketID: string = uuid(),
  ): Promise<SeasonTicket | null> {
    const _seasonTicket: SeasonTicket = new SeasonTicket();
    (_seasonTicket.ID = seasonTicketID),
      (_seasonTicket.User = (await this.userRepository.findOne({
        where: { ID: seasonTicket.UserID },
      })) as User);
    _seasonTicket.TicketType = seasonTicket.TicketType;
    _seasonTicket.Price = seasonTicket.Price;
    _seasonTicket.CreateDate = seasonTicket.CreateDate;
    _seasonTicket.ExpirationDate = seasonTicket.ExpirationDate;
    return this.seasonTicketRepository.save(_seasonTicket);
  }

  public async DeleteSeasonTickets(
    query: FindOptionsWhere<SeasonTicket>,
  ): Promise<DeleteResult> {
    return this.seasonTicketRepository.delete(query);
  }
}
