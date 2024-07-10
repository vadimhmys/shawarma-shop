import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    }
  },
});

export const { addItem } = basketSlice.actions;

export default basketSlice.reducer;
