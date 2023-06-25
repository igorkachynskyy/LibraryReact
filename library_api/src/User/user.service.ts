import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
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

  public async CreateUser(user: UserDto): Promise<User | null> {
    const _admin = new User();
    _admin.ID = uuid();
    _admin.Login = user.Login;
    _admin.Name = user.Name;
    _admin.Password = user.Password;
    _admin.Surename = user.Surename;
    return this.repository.save(_admin);
  }

  public async UpdateUser(user: User): Promise<InsertResult> {
    return this.repository.upsert(user, ['ID']);
  }

  public async DeleteUser(user: User): Promise<User | null> {
    return this.repository.remove(user);
  }
}
