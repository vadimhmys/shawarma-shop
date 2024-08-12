import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserOrder } from "./types";
import { userGetAll } from "../../http/orderAPI";

export const fetchUserOrders = createAsyncThunk<UserOrder[]>('users/fetchUserOrders', async () => {
  const { data } = await userGetAll();
  return data;
});