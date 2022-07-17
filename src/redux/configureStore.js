import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import lawyersIndexReducer from './lawyers/lawyersIndex';
import reservationList from './reservations/reservations';
import deleteResevation from './reservations/deleteReservation';
import reservationsCreate from './reservations/reservationsCreate';
import usersEdit from './users/usersEdit';
import usersDestroy from './users/usersDestroy';

const store = configureStore({
  reducer: {
    auth: authReducer,
    lawyers: lawyersIndexReducer,
    reservations: reservationList,
    delResevation: deleteResevation,
    reservations_create: reservationsCreate,
    users_edit: usersEdit,
    users_destroy: usersDestroy,
  },
});

export default store;
