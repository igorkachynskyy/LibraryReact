import { Author } from 'src/Author/author.entity';
import { Genre } from 'src/Book/book.entity';
import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { ChildEntity, Column, JoinTable, ManyToMany } from 'typeorm';

@ChildEntity()
export class EBook extends PublicationItem {
  @ManyToMany(() => Author, (author) => author.Books, { cascade: true })
  @JoinTable()
  Authors: Author[];

  @Column()
  ImagePath: string;

  @Column()
  Genre: Genre;
}
