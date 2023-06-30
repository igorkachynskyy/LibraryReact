import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { User } from 'src/User/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class LibraryItem {
  @PrimaryColumn()
  ID: string;

  @Column()
  IssueDate: Date;

  @Column()
  IsReturned: boolean;

  @Column()
  Deadline: Date;

  @ManyToOne(
    () => PublicationItem,
    (publicationItem) => publicationItem.LibraryItems,
    { cascade: true },
  )
  @JoinColumn()
  PublicationItem: PublicationItem;

  @ManyToOne(() => User, (user) => user.LibraryItems)
  @JoinColumn()
  User: User;
}
