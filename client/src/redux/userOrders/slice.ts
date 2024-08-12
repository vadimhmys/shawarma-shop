import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserOrdersState, StatusEnum, UOType } from './types';
import { fetchUserOrders } from './asyncAction';

const initialState: IUserOrdersState = {
  orders: [],
  status: StatusEnum.LOADING,
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.orders = [];
        state.status = StatusEnum.LOADING;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<UOType[]>) => {
        state.orders = action.payload;
        state.status = StatusEnum.SUCCESS;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.orders = [];
        state.status = StatusEnum.ERROR;
      });
  },
});

export default userOrdersSlice.reducer;
