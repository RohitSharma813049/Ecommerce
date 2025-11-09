// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/user';


const store = configureStore({
  reducer: {
    auth: authReducer,
  
  },
});

export default store;
