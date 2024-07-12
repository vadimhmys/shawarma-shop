import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchShawarmas = createAsyncThunk('users/fetchShawarmas', async (params) => {
  const { categoryId, sortBy, order, searchValue, limit, currentPage } = params;
  const { data } = await axios.get(
    `http://localhost:7000/api/shawarmas/getall?categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&searchValue=${searchValue}&limit=${limit}&currentPage=${currentPage}`,
  );
  return data;
});

const initialState = {
  shawarmas: [],
  count: 0,
  status: 'loading',
};

export const shawarmasSlice = createSlice({
  name: 'shawarmas',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchShawarmas.pending, (state) => {
        state.shawarmas = [];
        state.count = 0;
        state.status = 'loading';
      })
      .addCase(fetchShawarmas.fulfilled, (state, action) => {
        state.shawarmas = action.payload.rows;
        state.count = action.payload.count;
        state.status = 'success';
      })
      .addCase(fetchShawarmas.rejected, (state) => {
        state.shawarmas = [];
        state.count = 0;
        state.status = 'error';
      });
  },
});

export default shawarmasSlice.reducer;
