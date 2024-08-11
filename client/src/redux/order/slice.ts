import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderState, StatusEnum } from './types';
import { fetchOrder } from './asyncAction';
import { UserOrderType } from '../../http/orderAPI';

const initialState: IOrderState = {
  items: [],
  userName: '',
  phone: '',
  waitingTime: 15,
  comment: '',
  payment: 'CASH',
  status: StatusEnum.SUCCESS,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder(state, action: PayloadAction<UserOrderType>) {
      state.items = action.payload.items;
      state.userName = action.payload.userName;
      state.phone = action.payload.phone;
      state.waitingTime = action.payload.waitingTime;
      state.comment = action.payload.comment;
      state.payment = action.payload.payment;
    },
    clearOrder(state) {
      state.items = [];
      state.userName = '';
      state.phone = '';
      state.waitingTime = 15;
      state.comment = '';
      state.payment = 'CASH';
      state.status = StatusEnum.SUCCESS;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = StatusEnum.LOADING;
      })
      .addCase(fetchOrder.fulfilled, (state) => {
        state.items = [];
        state.userName = '';
        state.phone = '';
        state.waitingTime = 15;
        state.comment = '';
        state.payment = 'CASH';
        state.status = StatusEnum.SUCCESS;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.status = StatusEnum.ERROR;
      });
  },
});

export const { createOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
