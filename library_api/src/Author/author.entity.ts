import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist';
import { Book } from 'src/Book/book.entity';

@Entity()
export class Author {
  @PrimaryColumn()
  ID: string;

  @Column()
  Name: string;

  @Column()
  Surename: string;

  @Column()
  Rate: number;

  @JoinTable()
  @ManyToMany(() => Book, (book) => book.Authors)
  Books: Book[];
}
