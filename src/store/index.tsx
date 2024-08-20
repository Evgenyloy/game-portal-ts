import { configureStore } from '@reduxjs/toolkit';
import headerPopUp from '../slices/headerPopUpSlice';
import filters from '../slices/headerFiltersSlice';

export const store = configureStore({
  reducer: { filters, headerPopUp },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});
