import { createSlice } from '@reduxjs/toolkit';

export enum SortCriteryEnum {
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
};

export type SortType = {
  value: string;
  sortCritery: SortCriteryEnum
};

interface FilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}

const initialState: FilterState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    value: 'цене ↑',
    sortCritery: SortCriteryEnum.PRICE_DESC,
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
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilterParams, setSearchValue } =
  counterSlice.actions;

export default counterSlice.reducer;
