import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { AddressDto } from './address.dto';
import { Address } from './address.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AddressService {
  @InjectRepository(Address)
  private readonly repository: Repository<Address>;

  public async GetAddress(query: object): Promise<Address | null> {
    return this.repository.findOne(query);
  }

  public async CreateAddress(address: AddressDto): Promise<Address> {
    const _address: Address = new Address();

    _address.ID = uuid();
    _address.Country = address.Country;
    _address.City = address.City;
    _address.Street = address.Street;
    _address.Flat = address.Flat;
    _address.Postcode = address.Postcode;

    return this.repository.save(_address);
  }

  public async UpdateAddress(address: Address): Promise<InsertResult> {
    return this.repository.upsert(address, ['ID']);
  }

  public async DeleteAddress(address: Address): Promise<Address | null> {
    return this.repository.remove(address);
  }
}
