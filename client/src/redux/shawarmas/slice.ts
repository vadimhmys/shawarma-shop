import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataType, IShawarmasState, StatusEnum } from './types';
import { fetchShawarmas } from './asyncAction';

const initialState: IShawarmasState = {
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
      .addCase(fetchShawarmas.fulfilled, (state, action: PayloadAction<DataType>) => {
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
