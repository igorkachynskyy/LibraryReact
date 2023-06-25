import { User } from './user.entity';

export enum Role {
  Visitor = 'visitor',
  Manager = 'manager',
  Admin = 'admin',
}

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}
