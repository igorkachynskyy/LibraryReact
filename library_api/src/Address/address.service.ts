import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdrressDto } from './address.dto';
import { Address } from './address.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class AddressService {
  @InjectRepository(Address)
  private readonly repository: Repository<Address>;

  public async GetAddres(id: string): Promise<Address | null> {
    return this.repository.findOne({ where: { ID: id } });
  }

  public async CreateAddress(body: AdrressDto): Promise<Address> {
    const address: Address = new Address();

    address.ID = uuid();
    address.Country = body.Country;
    address.City = body.City;
    address.Street = body.Street;
    address.Flat = body.Flat;
    address.Postcode = body.Postcode;

    return this.repository.save(address);
  }
}
