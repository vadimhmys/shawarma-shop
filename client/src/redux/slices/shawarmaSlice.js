import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addedIngredients: [],
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
  },
});

export const { addIngredient, removeIngredient, clearIngredients } = shawarmaSlice.actions;

export default shawarmaSlice.reducer;
