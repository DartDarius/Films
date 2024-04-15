export const defaultNamePlayList = 'favorite movies';

export function defaultPlayList(name = defaultNamePlayList) {
  return {
    name,
    movies: [],
    owner: '65639ea784481de1430ea3e2',
    isPrivate: true,
    entriesCount: 4,
  };
}
