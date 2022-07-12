import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import lawyersIndexReducer from './lawyers/lawyersIndex';

const store = configureStore({
  reducer: {
    auth: authReducer,
    lawyers: lawyersIndexReducer,
  },
});

export default store;
