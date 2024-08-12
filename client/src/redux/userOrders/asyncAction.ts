import { createAsyncThunk } from "@reduxjs/toolkit";
import { UOType } from "./types";
import { userGetAll } from "../../http/orderAPI";

export const fetchUserOrders = createAsyncThunk<UOType[]>('users/fetchUserOrders', async () => {
  const data = await userGetAll();
  return data;
});