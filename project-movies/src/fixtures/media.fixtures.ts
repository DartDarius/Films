import { faker } from '@faker-js/faker';

export const getRandomMediaTitle = 'chto-to';
export const updateRandomMediaTitle = 's chem-to';

export function randomMedia(title = getRandomMediaTitle) {
  return {
    title: title,
    article: faker.word.words({ count: { min: 30, max: 10000 } }),
  };
}
