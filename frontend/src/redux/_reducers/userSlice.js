/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    isTrainer: false,
    id: '',
    isLogin: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.id;
      state.isLogin = true;
      state.isTrainer = false;
      return state;
    },
    logoutUser: (state, action) => {
      state.id = '';
      state.isLogIn = false;
      state.isTrainer = false;
      return state;
    },

    loginTrainer: (state, action) => {
      state.id = action.payload.id;
      state.isLogin = true;
      state.isTrainer = true;
      return state;
    },
    logoutTrainer: (state, action) => {
      state.id = '';
      state.isLogin = false;
      state.isTrainer = false;
      return state;
    },
  },
});

export const { loginUser, logoutUser, loginTrainer, logoutTrainer } =
  userSlice.actions;

export default userSlice.reducer;
