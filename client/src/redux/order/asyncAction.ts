import { createAsyncThunk } from "@reduxjs/toolkit";
import { userCreate } from "../../http/orderAPI";
import { UserOrderType } from "../../http/orderAPI";

export const fetchOrder = createAsyncThunk<any, UserOrderType>('users/fetchOrder', async (params) => {
  const { result } = await userCreate(params);
  return result;
});