import { Test, TestingModule } from '@nestjs/testing';
import { DirectorService } from './director.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './director.schema';
import { defaultDirectorName } from '.././fixtures/director.fixtures';
import { DB_CONNECTION_URL } from '../helpers/config';
import { TEST_VAlUES } from '../fixtures/testValues';

describe('DirectorService', () => {
  let service: DirectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: Director.name, schema: DirectorSchema },
        ]),
      ],
      providers: [DirectorService],
    }).compile();

    service = module.get<DirectorService>(DirectorService);
  });

  it('should created a director', async () => {
    const auth = TEST_VAlUES.TOKEN;
    const createDirectorDto = {
      name: defaultDirectorName,
      dateOfBirth: new Date('1961-10-31'),
    };
    const createDirector = await service.create(createDirectorDto, auth);
    expect(createDirector).toBeDefined();
  });

  afterEach(async () => {
    await service.deleteDirectorByName(defaultDirectorName);
  });

  it('should return all directors', async () => {
    const directors = await service.findAll();
    expect(directors).toBeInstanceOf(Array);
  });
});
