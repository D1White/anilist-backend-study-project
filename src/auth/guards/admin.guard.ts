import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoles } from 'user/types';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user?.role === UserRoles.admin;
  }
}
