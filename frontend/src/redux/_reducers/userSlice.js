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
      return state;
    },
    logoutUser: state => {
      state.id = '';
      state.isLogIn = false;
      return state;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
