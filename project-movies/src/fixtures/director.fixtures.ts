import { faker } from '@faker-js/faker';

export const defaultDirectorName = 'Nikodim';

export function randomDirector(director = defaultDirectorName) {
  return {
    director,
    dateOfBirth: faker.date.birthdate(),
  };
}
