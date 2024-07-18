import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type ShawarmaType = {
  id: number;
  name: string;
  title: string;
  categoryId: number;
  icon: string;
  image: string;
  novelty: boolean;
  presence: boolean;
  props: CardPropertyType[];
  components: CardComponentType[];
  createdAt: string;
  updatedAt: string;
};

export type CardPropertyType = {
  id: number;
  shawarmaId: number;
  price: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
};

export type CardComponentType = {
  id: number;
  name: string;
  necessity: boolean;
  shawarmaId: number;
  createdAt: string;
  updatedAt: string;
};

type DataType = {
  count: number;
  rows: ShawarmaType[];
};

interface ShawarmasState {
  shawarmas: ShawarmaType[],
  count: number;
  status: StatusEnum;
}

export const fetchShawarmas = createAsyncThunk<DataType, Record<string, string>>('users/fetchShawarmas', async (params) => {
  const { categoryId, sortBy, order, searchValue, limit, currentPage } = params;
  const { data } = await axios.get<DataType>(
    `http://localhost:7000/api/shawarmas/getall?categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&searchValue=${searchValue}&limit=${limit}&currentPage=${currentPage}`,
  );
  return data;
});

const initialState: ShawarmasState = {
  shawarmas: [],
  count: 0,
  status: StatusEnum.LOADING,
};

export const shawarmasSlice = createSlice({
  name: 'shawarmas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShawarmas.pending, (state) => {
        state.shawarmas = [];
        state.count = 0;
        state.status = StatusEnum.LOADING;
      })
      .addCase(fetchShawarmas.fulfilled, (state, action) => {
        state.shawarmas = action.payload.rows;
        state.count = action.payload.count;
        state.status = StatusEnum.SUCCESS;
      })
      .addCase(fetchShawarmas.rejected, (state) => {
        state.shawarmas = [];
        state.count = 0;
        state.status = StatusEnum.ERROR;
      });
  },
});

export default shawarmasSlice.reducer;
