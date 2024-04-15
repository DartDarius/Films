export const defaultGenreName = 'multi';
export const updateGenre = 'update test multi';

export function createGenre(genre = defaultGenreName) {
  return {
    genre,
  };
}
