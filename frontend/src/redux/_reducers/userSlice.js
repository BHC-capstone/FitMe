import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  user_id: '',
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return { ...state, loginSuccess: action.payload };
    },
    clearUser: state => {
      return { ...state };
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
