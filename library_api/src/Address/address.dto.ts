import { IsNotEmpty, IsString } from 'class-validator';

export class AdrressDto {
  @IsString()
  @IsNotEmpty()
  public Country: string;

  @IsString()
  @IsNotEmpty()
  public City: string;

  @IsString()
  @IsNotEmpty()
  public Street: string;

  @IsString()
  @IsNotEmpty()
  public Flat: string;

  @IsString()
  @IsNotEmpty()
  public Postcode: string;
}
