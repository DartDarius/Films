import { faker } from '@faker-js/faker';

export const randomMovieTitle = 'petuhi';

export function randomMovie(movie = randomMovieTitle) {
  return {
    title: movie,
    year: faker.number.int({ min: 1950, max: 2023 }),
    cast: [faker.person.fullName()],
    duration: faker.number.int({ min: 15, max: 240 }),
  };
}
