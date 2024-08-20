import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialFiltersState } from '../types/types';

const initialState: IInitialFiltersState = {
  platform: 'all',
  category: 'mmorpg',
  sort: 'relevance',
  inputSearch: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    platformSelected: (state, action: PayloadAction<string>) => {
      state.platform = action.payload;
    },
    categorySelected: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    sortBy: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setInputSearch: (state, action: PayloadAction<string>) => {
      state.inputSearch = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;
export default reducer;
export const { categorySelected, platformSelected, setInputSearch, sortBy } =
  actions;
