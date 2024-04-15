import { faker } from '@faker-js/faker';

export const defaultNickName = 'Kirill';

export function defaultUser(nickName = defaultNickName) {
  return {
    nickName,
    email: faker.internet.email(),
    roles: [faker.person.jobTitle()],
    password: faker.word.words(),
  };
}
