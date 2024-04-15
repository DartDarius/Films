import { Test, TestingModule } from '@nestjs/testing';
import { PlayListController } from './play-list.controller';
import { PlayListService } from './play-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayListSchema, PlayList } from './play-list.schema';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';
import { DB_CONNECTION_URL } from '../helpers/config';

describe('PlayListController', () => {
  let controller: PlayListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: PlayList.name, schema: PlayListSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      controllers: [PlayListController],
      providers: [PlayListService, UserService],
    }).compile();

    controller = module.get<PlayListController>(PlayListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
