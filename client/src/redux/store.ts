import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './slices/filterSlice';
import basket from './slices/basketSlice';
import shawarma from './slices/shawarmaSlice';
import shawarmas from './slices/shawarmasSlice';
import user from './slices/userSlice';

export const store = configureStore({
  reducer: {
    filter,
    basket,
    shawarma,
    shawarmas,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();