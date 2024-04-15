import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlayListService } from '../play-list.service';

@Injectable()
export class PrivatePlayListGuard implements CanActivate {
  constructor(private readonly playlistService: PlayListService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    const playlist = await this.playlistService.findOne(id);

    if (playlist && playlist.isPrivate) {
      return false;
    }
    return true;
  }
}
