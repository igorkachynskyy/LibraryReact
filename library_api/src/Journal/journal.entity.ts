import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Journal extends PublicationItem {
  @Column()
  ImagePath: string;
}
