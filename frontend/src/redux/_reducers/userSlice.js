/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    isTrainer: false,
    id: '',
    isLogin: false,
    tid: '',
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
      state.isLogin = false;
      state.isTrainer = false;
      return state;
    },
    payUser: (state, action) => {
      state.tid = action.payload.tId;
      return state;
    },

    loginTrainer: (state, action) => {
      state.id = action.payload.id;
      state.isLogin = true;
      state.isTrainer = true;
      return state;
    },
  },
});

export const { loginUser, logoutUser, loginTrainer, payUser } =
  userSlice.actions;

export default userSlice.reducer;
