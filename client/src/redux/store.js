import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import basket from './slices/basketSlice';
import ingredient from './slices/ingredientSlice';

export const store = configureStore({
  reducer: {
    filter,
    basket,
    ingredient
  },
});
