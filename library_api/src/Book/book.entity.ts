import { Author } from 'src/Author/author.entity';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { ChildEntity, Column, JoinTable, ManyToMany } from 'typeorm';

export enum Genre {
  Horror = 'horror',
  Fiction = 'fiction',
  Mystery = 'mystery',
  Romance = 'romance',
  Fantasy = 'fantasy',
  ScienceFiction = 'science_fiction',
  Biography = 'biohraphy',
  History = 'history',
  Thriller = 'thriller',
  Comedy = 'comedy',
}

@ChildEntity()
export class Book extends PublicationItem {
  @ManyToMany(() => Author, (author) => author.Books, { cascade: true })
  @JoinTable()
  Authors: Author[];

  @Column()
  ImagePath: string;

  @Column()
  Genre: Genre;
}
