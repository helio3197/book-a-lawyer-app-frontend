import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import lawyersIndexReducer from './lawyers/lawyersIndex';
import reservationList from './reservations/reservations';
import deleteResevation from './reservations/deleteReservation';

const store = configureStore({
  reducer: {
    auth: authReducer,
    lawyers: lawyersIndexReducer,
    reservations: reservationList,
    delResevation: deleteResevation,
  },
});

export default store;
