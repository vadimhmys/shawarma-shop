import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DataType, SearchShawarmaParamsType } from "./types";

export const fetchShawarmas = createAsyncThunk<DataType, SearchShawarmaParamsType>('users/fetchShawarmas', async (params) => {
  const { categoryId, sortBy, order, searchValue, limit, currentPage } = params;
  const { data } = await axios.get<DataType>(
    `${process.env.REACT_APP_API_URL}shawarmas/getall?categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&searchValue=${searchValue}&limit=${limit}&currentPage=${currentPage}`,
  );
  return data;
});