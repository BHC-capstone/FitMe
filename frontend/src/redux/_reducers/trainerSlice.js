/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainer: {
    isTrainer: true,
    isLogin: false,
    id: '',
  },
};

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    loginTrainer: (state, action) => {
      state.isLogin = true;
      state.id = action.payload.id;
    },
    logoutTrainer: state => {
      state.isLogIn = false;
      state.id = '';
    },
  },
});

export const { loginTrainer, logoutTrainer } = trainerSlice.actions;

export default trainerSlice.reducer;
