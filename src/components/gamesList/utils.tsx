import { IGamesList } from "../../types/types";

export function filterGames(searchText: string, listOfGames: IGamesList[]) {
  if (!listOfGames.length) return listOfGames;
  if (!searchText) return listOfGames;

  return listOfGames.filter(({ title }) =>
    title.toLowerCase().startsWith(searchText.toLowerCase())
  );
}
