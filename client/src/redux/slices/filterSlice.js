import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    value: 'цене ↑',
    sortCritery: 'price',
  },
};

export const counterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    }
  },
});

export const { setCategoryId } = counterSlice.actions;

export default counterSlice.reducer;
