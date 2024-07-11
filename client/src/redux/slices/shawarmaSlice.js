import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addedIngredients: [],
  removedComponents: [],
};

export const shawarmaSlice = createSlice({
  name: 'shawarma',
  initialState,
  reducers: {
    addIngredient(state, action) {
      const findIngredient = state.addedIngredients.find((ing) => ing.id === action.payload.id);
      if (findIngredient) {
        findIngredient.count++;
      } else {
        state.addedIngredients.push(action.payload);
      }
    },
    removeIngredient(state, action) {
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
    addComponent(state, action) {
      state.removedComponents.push(action.payload);
    },
    removeComponent(state, action) {
      state.removedComponents = state.removedComponents.filter(
        (component) => component !== action.payload,
      );
    },
    clearRemovedComponents(state) {
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
} = shawarmaSlice.actions;

export default shawarmaSlice.reducer;
