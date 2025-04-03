export const GENRES = [
  "moba",
  "shooter",
  "mmorpg",
  "battle-royale",
  "racing",
] as const;

export type GameGenre = (typeof GENRES)[number];

export const getNewGenre = (genreHistory: GameGenre[]): GameGenre => {
  const lastGenre = genreHistory[genreHistory.length - 1];
  const availableGenres = lastGenre
    ? GENRES.filter((g) => g !== lastGenre)
    : [...GENRES];

  if (availableGenres.length === 0) {
    return GENRES[Math.floor(Math.random() * GENRES.length)];
  }

  return availableGenres[Math.floor(Math.random() * availableGenres.length)];
};
