import { IGamesList } from "../../types/types";

export function randomGames(mmo: IGamesList[]) {
  let randomNum = Math.floor(Math.random() * 150);
  const item = mmo.slice(randomNum, 4 + randomNum);
  return item;
}
