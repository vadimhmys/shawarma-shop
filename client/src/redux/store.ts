import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './filter/slice';
import basket from './basket/slice';
import shawarma from './shawarma/slice';
import shawarmas from './shawarmas/slice';
import user from './user/slice';

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