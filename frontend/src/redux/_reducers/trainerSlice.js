/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainer: {
    isLogin: false,
    username: '',
    user_id: '',
    password: '',
  },
};

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    loginTrainer: (state, action) => {
      state.isLogin = true;
      state.user_name = action.payload.user_name;
      state.user_id = action.payload.user_id;
      state.password = action.payload.password;
    },
    logoutTrainer: state => {
      state.isLogIn = false;
      state.user_name = null;
      state.user_id = null;
      state.password = null;
    },
  },
});

export const { loginTrainer, logoutTrainer } = trainerSlice.actions;

export default trainerSlice.reducer;
