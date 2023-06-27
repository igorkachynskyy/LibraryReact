import { Entity, PrimaryColumn, Column } from 'typeorm';

export enum TicketType {
  Basic = 'basic',
  Premium = 'premium',
}

@Entity()
export class SeasonTicket {
  @PrimaryColumn()
  ID: string;

  @Column()
  UserID: string;

  @Column()
  TicketType: TicketType;

  @Column()
  Price: number;

  @Column()
  CreateDate: Date;

  @Column()
  ExpirationDate: Date;
}
