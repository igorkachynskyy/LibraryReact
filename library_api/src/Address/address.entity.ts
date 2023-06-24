import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryColumn()
  public ID: string;

  @Column()
  public Country: string;

  @Column()
  public City: string;

  @Column()
  public Street: string;

  @Column()
  public Flat: string;

  @Column()
  public Postcode: string;
}
