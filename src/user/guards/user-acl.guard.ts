import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoles } from 'user/types';

@Injectable()
export class UserAclGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    return params?.id === user?.id || user?.role === UserRoles.admin;
  }
}
