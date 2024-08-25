import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialPopUpState } from '../types/types';

const initialState: IInitialPopUpState = {
  popUpVisible: false,
};

const popUpSlice = createSlice({
  name: 'hederPopUp',
  initialState,
  reducers: {
    changePopUp: (state) => {
      state.popUpVisible = !state.popUpVisible;
    },
  },
});

const { actions, reducer } = popUpSlice;
export default reducer;
export const { changePopUp } = actions;
