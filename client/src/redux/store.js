import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import basket from './slices/basketSlice';
import shawarma from './slices/shawarmaSlice';
import shawarmas from './slices/shawarmasSlice';

export const store = configureStore({
  reducer: {
    filter,
    basket,
    shawarma,
    shawarmas
  },
});
