import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { defaultUser, defaultNickName } from '../fixtures/user.fixtures';
import { DB_CONNECTION_URL } from '../helpers/config';
import { TEST_VAlUES } from '../fixtures/testValues';

describe('UserService', () => {
  let service: UserService;

  async function createAndGetUserId(createUserByDefault = defaultUser()) {
    const createdUser = await service.create(createUserByDefault);
    return createdUser.id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should created a user', async () => {
    const createUserDto = defaultUser();
    const createUser = await service.create(createUserDto);
    expect(createUser).toBeDefined();
    expect(createUser.nickName).toBeDefined();
  });

  afterEach(async () => {
    await service.deleteUserByName(defaultNickName);
  });

  it('should return all users', async () => {
    const users = await service.findAll();

    expect(users).toBeInstanceOf(Array);
  });

  it('should return a user by id', async () => {
    const auth = TEST_VAlUES.TOKEN;
    const userDto = defaultUser();
    const userId = await createAndGetUserId(userDto);
    const user = await service.findOne(userId, auth);

    expect(user).toEqual(expect.objectContaining(userDto));
  });
});
