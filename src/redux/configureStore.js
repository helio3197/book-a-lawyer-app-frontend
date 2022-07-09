import { configureStore } from '@reduxjs/toolkit';

const rootReducer = () => ({ status: 'Placeholder reducer' });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
