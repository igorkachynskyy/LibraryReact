import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Role } from './user.interface';

@Entity()
export class User {
  @PrimaryColumn()
  ID: string;

  @Column()
  Name: string;

  @Column()
  Surename: string;

  @Column()
  Login: string;

  @Column()
  Password: string;

  @Column()
  Role: Role;
}
