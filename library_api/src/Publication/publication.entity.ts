import { PublicationItem } from 'src/PublicationItem/publicationitem.entity';
import { ChildEntity } from 'typeorm';

@ChildEntity()
export class Publication extends PublicationItem {}
