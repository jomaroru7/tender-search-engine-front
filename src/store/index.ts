import { configureStore } from '@reduxjs/toolkit';
import cpvReducer from './slices/cpvSlice';

export const store = configureStore({
  reducer: {
    cpv: cpvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
