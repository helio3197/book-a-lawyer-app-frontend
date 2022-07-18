import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import lawyersIndexReducer from './lawyers/lawyersIndex';
import reservationsCreate from './reservations/reservationsCreate';
import usersEdit from './users/usersEdit';
import usersDestroy from './users/usersDestroy';
import lawyerCreate from './lawyers/lawyerCreate';
import lawyerDestroy from './lawyers/lawyerDestroy';

const store = configureStore({
  reducer: {
    auth: authReducer,
    lawyers: lawyersIndexReducer,
    lawyer_create: lawyerCreate,
    lawyer_destroy: lawyerDestroy,
    reservations_create: reservationsCreate,
    users_edit: usersEdit,
    users_destroy: usersDestroy,
  },
});

export default store;
