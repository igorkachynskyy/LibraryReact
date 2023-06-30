import { Author } from 'src/Author/author.entity';
import { LibraryItem } from 'src/LibraryItem/libraryitem.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Review } from 'src/Review/review.entity';
import { Tag } from 'src/Tag/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  TableInheritance,
} from 'typeorm';

export enum Language {
  Ukrainian = 'ukrainian',
  English = 'english',
  German = 'german',
  French = 'french',
  Polish = 'polish',
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'Type' } })
export class PublicationItem {
  @PrimaryColumn()
  ID: string;

  @Column()
  Title: string;

  @Column()
  DatePublished: Date;

  @Column()
  Language: Language;

  @OneToMany(() => LibraryItem, (libraryItem) => libraryItem.PublicationItem)
  @JoinColumn()
  LibraryItems: LibraryItem[] | null;

  @JoinColumn()
  @ManyToOne(() => Publisher, (publisher) => publisher.PublicationItems, {
    cascade: true,
  })
  Publisher: Publisher | null;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.PublicationItems, {
    eager: true,
    cascade: true,
  })
  Tags: Tag[] | null;

  @Column()
  Preview: string;

  @JoinColumn()
  @OneToMany(() => Review, (review) => review.PublicationItem, {
    eager: true,
    cascade: true,
  })
  Reviews: Review[] | null;

  @Column()
  Rating: number;

  @Column()
  Price: number;

  @Column()
  Pages: number;
}
