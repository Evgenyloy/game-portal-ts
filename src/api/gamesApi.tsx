import { fetchApi } from "./fetchApi";
import { IFilteredGamesArgs, IGame, IGamesList, INews } from "../types/types";

export const getNewsList = async (): Promise<INews[]> => {
  return fetchApi<INews[]>("/latestnews");
};

export const getMmoGames = async (): Promise<IGamesList[]> => {
  return fetchApi<IGamesList[]>("/games", { category: "mmorpg" });
};

export const getGamesByCategory = async (
  category: string = "mmo"
): Promise<IGamesList[]> => {
  return fetchApi<IGamesList[]>("/games", { category });
};

export const getGameById = async (id: string): Promise<IGame> => {
  return fetchApi<IGame>("/game", { id });
};

export const getFilteredGames = async ({
  platform,
  category,
  sort,
}: IFilteredGamesArgs): Promise<IGamesList[]> => {
  return fetchApi<IGamesList[]>("/games", {
    platform,
    category,
    "sort-by": sort,
  });
};
