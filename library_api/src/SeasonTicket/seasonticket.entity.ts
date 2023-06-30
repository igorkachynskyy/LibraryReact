import { User } from 'src/User/user.entity';
import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';

export enum TicketType {
  Basic = 'basic',
  Premium = 'premium',
}

@Entity()
export class SeasonTicket {
  @PrimaryColumn()
  ID: string;

  @JoinColumn()
  @OneToOne(() => User, (user) => user.SeasonTicket)
  User: User;

  @Column()
  TicketType: TicketType;

  @Column()
  Price: number;

  @Column()
  CreateDate: Date;

  @Column()
  ExpirationDate: Date;
}
