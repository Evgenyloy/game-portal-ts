import { configureStore } from '@reduxjs/toolkit';
import headerPopUp from '../slices/headerPopUpSlice';
import filters from '../slices/headerFiltersSlice';
import news from '../slices/newsSlice';
import { apiSlice } from '../api/apiSlice';

export const store = configureStore({
  reducer: {
    filters,
    headerPopUp,
    news,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
