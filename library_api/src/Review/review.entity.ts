import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { User } from 'src/User/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryColumn()
  ID: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.Reviews)
  User: User;

  @Column()
  Message: string;

  @Column()
  Rating: number;

  @JoinColumn()
  @ManyToOne(
    () => PublicationItem,
    (publicationItem) => publicationItem.Reviews,
  )
  PublicationItem: PublicationItem;
}
