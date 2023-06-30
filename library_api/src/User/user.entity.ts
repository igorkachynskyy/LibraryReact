import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  OneToMany,
  Unique,
  OneToOne,
} from 'typeorm';
import { Role } from './user.interface';
import { LibraryItem } from 'src/LibraryItem/libraryitem.entity';
import { Review } from 'src/Review/review.entity';
import { SeasonTicket } from 'src/SeasonTicket/seasonticket.entity';

@Entity()
@Unique(['Login'])
export class User {
  @PrimaryColumn()
  ID: string;

  @Column()
  Name: string;

  @Column()
  Surename: string;

  @Column()
  Login: string;

  @Column()
  Password: string;

  @Column()
  Role: Role;

  @JoinColumn()
  @OneToOne(() => SeasonTicket, (seasonTicket) => seasonTicket.User, {
    cascade: true,
  })
  SeasonTicket: SeasonTicket | null;

  @OneToMany(() => LibraryItem, (libraryItem) => libraryItem.User, {
    cascade: true,
  })
  @JoinColumn()
  LibraryItems: LibraryItem[] | null;

  @JoinColumn()
  @OneToMany(() => Review, (review) => review.User)
  Reviews: Review[] | null;
}
