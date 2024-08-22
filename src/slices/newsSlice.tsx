import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INews } from '../types/types';

const initialState = {
  selectedNews: localStorage.getItem('news')
    ? JSON.parse(localStorage.getItem('news') || '')
    : {},
};

const newsSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    selectNews: (state, action: PayloadAction<INews>) => {
      state.selectedNews = action.payload;
    },
  },
});

const { actions, reducer } = newsSlice;
export default reducer;
export const { selectNews } = actions;
