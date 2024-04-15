import { User } from '../../user/user.schema';
import { PlayList } from '../play-list.schema';
import { ERROR_MESSAGE } from '../../helpers/constants';
import { ConflictException } from '@nestjs/common';

export function isOwner(user: User, playList: PlayList) {
  if (playList.owner.email !== user.email) {
    throw new ConflictException(ERROR_MESSAGE.ERROR_OWNER);
  }
  return playList;
}
