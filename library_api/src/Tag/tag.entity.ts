import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['Description'])
export class Tag {
  @PrimaryColumn()
  ID: string;

  @Column()
  Description: string;

  @JoinTable()
  @ManyToMany(() => PublicationItem, (publicationItem) => publicationItem.Tags)
  PublicationItems: PublicationItem[] | null;
}
