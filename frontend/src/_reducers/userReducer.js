// import produce from 'immer';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGIN_TRAINER,
  REGISTER_TRAINER,
  LOGOUT,
} from '../_actions/types';

const initialState = {
  user: {
    isLoggedIn: false,
    data: null,
  },
  trainer: {
    isLoggedIn: false,
    data: null,
  },
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case LOGIN_TRAINER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, success: action.payload };
    case REGISTER_TRAINER:
      return { ...state, success: action.payload };

    default:
      return state;
  }
};

export default user;
