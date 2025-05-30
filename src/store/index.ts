import { configureStore } from '@reduxjs/toolkit';
import cpvReducer from './slices/cpvSlice';
import companyReducer from './slices/companySlice'

export const store = configureStore({
  reducer: {
    cpv: cpvReducer,
    company: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
