import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/User/user.interface';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
