import { createAsyncThunk } from "@reduxjs/toolkit";
import { BasketItemsFromDBType, BasketItemType, ShawarmasFromLSParamsType, UserIdParamsType } from "./types";
import { authInstance } from "../../http";

export const fetchShawarmasFromBasket = createAsyncThunk<BasketItemType[], UserIdParamsType>('basket/fetchShawarmasFromBasket', async (params) => {
  const { id } = params;
  if (id) {
    const { data } = await authInstance.get<BasketItemsFromDBType[]>(
      `basketshawarmas/getByUserId?id=${id}`,
    );
    const result: BasketItemType[] = data.map(i => ({
      id: i.id,
      title: i.title,
      image: i.image,
      weight: i.weight,
      price: i.price,
      cake: i.cake,
      count: i.count,
      addedComponentsList: JSON.parse(i.addedComponentsList),
      removedComponentsList: JSON.parse(i.removedComponentsList)
    }));
    return result;
  } else {
    return [];
  }
});

export const fetchIncrementShawarma = createAsyncThunk<BasketItemsFromDBType, number>('basket/fetchIncrementShawarmaFromBasket', async (id) => {
  const { data } = await authInstance.put<BasketItemsFromDBType>(
    `basketshawarmas/increment`,
    { id }
  );
  return data;
});

export const fetchDecrementShawarma = createAsyncThunk<BasketItemsFromDBType, number>('basket/fetchDecrementShawarmaFromBasket', async (id) => {
  const { data } = await authInstance.put<BasketItemsFromDBType>(
    `http://localhost:7000/api/basketshawarmas/decrement`,
    { id }
  );
  return data;
});

export const fetchDeleteShawarma = createAsyncThunk<BasketItemsFromDBType, number>('basket/fetchDeleteShawarmaFromBasket', async (id) => {
  const { data } = await authInstance.delete<BasketItemsFromDBType>(
    `basketshawarmas/delete?id=${id}`
  );
  return data;
});

export const fetchClearBasket = createAsyncThunk<[], number>('basket/fetchClearBasket', async (id) => {
  await authInstance.put<[]>(
    `basketshawarmas/clear`,
    { id }
  );
  return [];
});

export const fetchShawarmasFromLS = createAsyncThunk<BasketItemType[], ShawarmasFromLSParamsType>('basket/ShawarmasFromLS', async (params) => {
  const { items, userId } = params;
  const { data } = await authInstance.post<BasketItemsFromDBType[]>(
    `basketshawarmas/recordAll`,
    { items, userId }
  );
  const result: BasketItemType[] = data.map(i => ({
    id: i.id,
    title: i.title,
    image: i.image,
    weight: i.weight,
    price: i.price,
    cake: i.cake,
    count: i.count,
    addedComponentsList: JSON.parse(i.addedComponentsList),
    removedComponentsList: JSON.parse(i.removedComponentsList)
  }));
  return result;
});