import { Test, TestingModule } from '@nestjs/testing';
import { PlayListService } from './play-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayListSchema, PlayList } from './play-list.schema';
import { defaultNamePlayList } from '.././fixtures/play-list.fixtures';
import { DB_CONNECTION_URL } from '../helpers/config';
import { TEST_VAlUES } from '../fixtures/testValues';

describe('PlayListService', () => {
  let service: PlayListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: PlayList.name, schema: PlayListSchema },
        ]),
      ],
      providers: [PlayListService],
    }).compile();

    service = module.get<PlayListService>(PlayListService);
  });

  it('should create a playList', async () => {
    const createPlayListDTO = {
      name: defaultNamePlayList,
      movies: [TEST_VAlUES.ID_MOVIE],
      owner: TEST_VAlUES.ID_OWNER_OF_PL,
      isPrivate: true,
      entriesCount: TEST_VAlUES.COUNT,
    };
    const createPlayList = await service.create(createPlayListDTO);
    expect(createPlayList).toBeDefined();
  });

  afterEach(async () => {
    await service.deletePlayListByName(defaultNamePlayList);
  });

  it('should return all playLists', async () => {
    const playLists = await service.findAll();
    expect(playLists).toBeInstanceOf(Array);
  });
});
