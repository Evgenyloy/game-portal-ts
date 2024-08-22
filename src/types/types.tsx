import { store } from '../store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IInitialFiltersState {
  platform: string;
  category: string;
  sort: string;
  inputSearch: string;
}

export interface IInitialPopUpState {
  popUpVisible: boolean;
}

export interface INews {
  article_content: string;
  article_url: string;
  id: number;
  main_image: string;
  short_description: string;
  thumbnail: string;
  title: string;
}

export interface IGamesList {
  developer: string;
  game_url: string;
  genre: string;
  id: number;
  platform: string;
  profile_url: string;
  publisher: string;
  release_data: string;
  short_description: string;
  thumbnail: string;
  title: string;
}
