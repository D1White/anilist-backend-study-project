import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoles } from 'user/types';
import { ListService } from 'list/list.service';

@Injectable()
export class AnimeAclGuard implements CanActivate {
  constructor(private listService: ListService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const body = request.body;

    if (!user || !body?.list_id) return false;

    const list = await this.listService.findList(body.list_id);

    return (
      JSON.stringify(list?.user_id) === JSON.stringify(user.id) || user.role === UserRoles.admin
    );
  }
}
