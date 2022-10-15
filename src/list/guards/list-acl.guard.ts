import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoles } from 'user/types';
import { ListService } from 'list/list.service';

@Injectable()
export class ListAclGuard implements CanActivate {
  constructor(private listService: ListService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    if (!user || !params?.id) return false;

    const list = await this.listService.listModel.findOne({ user_id: user.id }).exec();

    return JSON.stringify(list?._id) === JSON.stringify(params.id) || user.role === UserRoles.admin;
  }
}
