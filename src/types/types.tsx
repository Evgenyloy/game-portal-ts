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
