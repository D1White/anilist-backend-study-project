import { Request } from 'express';
import { UserRoles } from 'user/types';

export interface AuthRequest extends Request {
  user: {
    sub: string;
    email: string;
    role: UserRoles;
  };
}
