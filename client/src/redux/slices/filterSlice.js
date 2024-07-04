import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
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
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilterParams(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    }
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilterParams } = counterSlice.actions;

export default counterSlice.reducer;
