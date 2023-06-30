import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['Name'])
export class Publisher {
  @PrimaryColumn()
  ID: string;

  @Column()
  Name: string;

  @OneToMany(
    () => PublicationItem,
    (publicationItem) => publicationItem.Publisher,
    { cascade: true },
  )
  @JoinColumn()
  PublicationItems: PublicationItem[] | null;
}
