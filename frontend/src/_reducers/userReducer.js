//import produce from 'immer';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGIN_TRAINER,
  REGISTER_TRAINER,
  LOGOUT,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case LOGIN_TRAINER:
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, success: action.payload };
      break;
    case REGISTER_TRAINER:
      return { ...state, success: action.payload };
      break;
    /*     case LOGOUT:
      return { ...state, success: action.payload };
      break; */

    default:
      return state;
  }
}
