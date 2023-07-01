import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  InsertResult,
  Repository,
} from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async GetUser(query: FindManyOptions<User>): Promise<User | null> {
    return this.repository.findOne(query);
  }

  public async GetUsers(query: FindManyOptions<User>): Promise<User[] | null> {
    return this.repository.find(query);
  }

  public async CreateUser(
    user: UserDto,
    userID: string = uuid(),
  ): Promise<User | null> {
    const _user = { ID: userID as UUID, ...user } as User;
    return this.repository.save(_user);
  }

  public async DeleteUsers(
    query: FindOptionsWhere<User>,
  ): Promise<DeleteResult> {
    return this.repository.delete(query);
  }
}
