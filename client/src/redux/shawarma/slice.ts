import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketAddedComponentType } from '../basket/types';
import { IShawarmaState, RemoverIngredientType } from './types';

const initialState: IShawarmaState = {
  addedIngredients: [],
  removedComponents: [],
};

export const shawarmaSlice = createSlice({
  name: 'shawarma',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<BasketAddedComponentType>) {
      const findIngredient = state.addedIngredients.find((ing) => ing.id === action.payload.id);
      if (findIngredient) {
        findIngredient.count++;
      } else {
        state.addedIngredients.push(action.payload);
      }
    },
    removeIngredient(state, action: PayloadAction<RemoverIngredientType>) {
      const findIngredient = state.addedIngredients.find((ing) => ing.id === action.payload.id);
      if (findIngredient && findIngredient.count > 1) {
        findIngredient.count--;
      } else {
        state.addedIngredients = state.addedIngredients.filter(
          (ing) => ing.id !== action.payload.id,
        );
      }
    },
    clearIngredients(state) {
      state.addedIngredients = [];
    },
    addComponent(state, action: PayloadAction<string>) {
      state.removedComponents.push(action.payload);
    },
    removeComponent(state, action: PayloadAction<string>) {
      state.removedComponents = state.removedComponents.filter(
        (component) => component !== action.payload,
      );
    },
    clearRemovedComponents(state) {
      state.removedComponents = [];
    },
    clearAllData(state) {
      state.addedIngredients = [];
      state.removedComponents = [];
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  addComponent,
  removeComponent,
  clearRemovedComponents,
  clearAllData,
} = shawarmaSlice.actions;

export default shawarmaSlice.reducer;
