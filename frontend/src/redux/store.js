import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './_reducers/userSlice';
import { trainerSlice } from './_reducers/trainerSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  trainer: trainerSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
