import { useQuery } from "@tanstack/react-query";
import {
  getNewsList,
  getFilteredGames,
  getGameById,
  getGamesByCategory,
  getMmoGames,
} from "../api/gamesApi";
import { IFilteredGamesArgs } from "../types/types";

export const useGetNewsList = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: getNewsList,
  });
};

export const useGetMmoGame = () => {
  return useQuery({
    queryKey: ["games", "mmorpg"],
    queryFn: getMmoGames,
  });
};

export const useGetGamesByCategory = (category: string) => {
  return useQuery({
    queryKey: ["games", category],
    queryFn: () => getGamesByCategory(category),
  });
};

export const useGetGameById = (id: string) => {
  return useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameById(id),
  });
};

export const useGetFilteredGames = (params: IFilteredGamesArgs) => {
  return useQuery({
    queryKey: ["filteredGames", params],
    queryFn: () => getFilteredGames(params),
  });
};
