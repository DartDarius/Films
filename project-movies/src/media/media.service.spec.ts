import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { DB_CONNECTION_URL } from '../helpers/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema, MediaDocument } from './media.schema';
import {
  getRandomMediaTitle,
  randomMedia,
  updateRandomMediaTitle,
} from '../fixtures/media.fixtures';
import { TEST_VAlUES } from '../fixtures/testValues';

describe('MediaService', () => {
  let service: MediaService;

  async function createMediaAndGetId(mediaDTO = randomMedia(), auth: string) {
    const createdMedia = await service.create(mediaDTO, auth);
    return createdMedia._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
      ],
      providers: [MediaService],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should created a media', async () => {
    const auth = TEST_VAlUES.TOKEN;
    const createMediaDto = {
      title: getRandomMediaTitle,
      article: 'some text',
    };
    const createdMedia = await service.create(createMediaDto, auth);
    expect(createdMedia.title).toBeDefined();
    expect(createdMedia.article).toBeDefined();
  });

  afterEach(async () => {
    await service.removeMediaByTitle(getRandomMediaTitle);
    await service.removeMediaByTitle(updateRandomMediaTitle);
  });

  it('should return all medias', async () => {
    const medias = await service.findAll();
    expect(medias).toBeInstanceOf(Array);
  });

  it('should return media by ID', async () => {
    const mediaDTO = randomMedia();
    const auth = TEST_VAlUES.TOKEN;
    const mediaById = await createMediaAndGetId(mediaDTO, auth);
    const media = await service.findOne(mediaById);
    expect(media).toEqual(expect.objectContaining(mediaDTO));
  });

  it('should update media by ID', async () => {
    const auth = TEST_VAlUES.TOKEN;
    const mediaDTO = randomMedia();
    const mediaById = await createMediaAndGetId(mediaDTO, auth);
    const media = await service.update(
      mediaById,
      {
        title: updateRandomMediaTitle,
        article: TEST_VAlUES.STRING_FOR_TEST,
      },
      auth,
    );
    expect(media?.title).toEqual(updateRandomMediaTitle);
    expect(media?.article).toBeDefined();
  });

  it('should delete media by ID', async () => {
    const mediaDTO = randomMedia();
    const auth = TEST_VAlUES.TOKEN;
    const mediaById = (await service.create(mediaDTO, auth)) as MediaDocument;
    const id = mediaById._id.toString();
    const deleteMedia = await service.remove(id, auth);
    expect(deleteMedia.title).toBeDefined();
  });
});
