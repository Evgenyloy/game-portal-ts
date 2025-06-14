import { useState, useCallback } from "react";
import { GameGenre, getNewGenre } from "./utils";

export const useGameRefresh = (
  refetch: () => void,
  genreHistory: GameGenre[],
  setGenreHistory: (update: (prev: GameGenre[]) => GameGenre[]) => void
) => {
  const [isCooldown, setIsCooldown] = useState(false);

  const handleRefresh = useCallback(() => {
    if (isCooldown) return;

    const newGenre = getNewGenre(genreHistory);
    setGenreHistory((prev) => [...prev, newGenre]);
    setIsCooldown(true);

    refetch();

    const timer = setTimeout(() => setIsCooldown(false), 1000);
    return () => clearTimeout(timer);
  }, [genreHistory, isCooldown, refetch, setGenreHistory]);

  return {
    handleRefresh,
    isCooldown,
  };
};
