import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGIN_TRAINER,
  REGISTER_TRAINER,
  LOGOUT,
} from './types';

// const USER_URL = '/users';
// const TRAINER_URL = '/trainers';

// 일반사용자 회원가입
// export function registerUser(dataToSubmit) {
//   const request = axios
//     .post('/api/users/register', dataToSubmit)
//     .then(reponse => Response.data)
//     .catch(err => console.log(err));

//   return {
//     type: REGISTER_USER,
//     payload: request,
//   };
// }

// 일반사용자 로그인
// export function loginUser(dataToSubmit) {
//   const request = axios
//     .post('/api/users/login', dataToSubmit)
//     .then(reponse => Response.data)
//     .catch(err => console.log(err));

//   return {
//     type: LOGIN_USER,
//     payload: request,
//   };
// }

// 트레이너 회원가입
// export function registerTrainer(dataToSubmit) {
//   const request = axios
//     .post('/api/trainers/register', dataToSubmit)
//     .then(reponse => Response.data)
//     .catch(err => console.log(err));

//   return {
//     type: REGISTER_TRAINER,
//     payload: request,
//   };
// }

// 트레이너 로그인
// export function loginTrainer(dataToSubmit) {
//   const request = axios
//     .post('/api/trainers/login', dataToSubmit)
//     .then(reponse => Response.data)
//     .catch(err => console.log(err));

//   return {
//     type: LOGIN_TRAINER,
//     payload: request,
//   };
// }

// export function logout() {
//   const data = axios.post(USER_URL + '/auth')
// .then(reponse => Response.data);
//
//   return {
//     type: LOGOUT,
//     payload: data,
//   };
// }
