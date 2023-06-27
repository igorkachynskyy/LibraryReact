import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async GetUser(query: object): Promise<User | null> {
    return this.repository.findOne(query);
  }

  public async GetUsers(query: object): Promise<User[] | null> {
    return this.repository.find(query);
  }

  public async CreateUser(user: UserDto): Promise<User | null> {
    const _user = { ID: uuid(), ...user } as User;
    return this.repository.save(_user);
  }

  public async UpdateUser(user: User): Promise<InsertResult> {
    return this.repository.upsert(user, ['ID']);
  }

  public async DeleteUsers(query: object): Promise<DeleteResult> {
    return this.repository.delete(query);
  }
}
