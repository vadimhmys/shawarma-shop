import { createAsyncThunk } from "@reduxjs/toolkit";
import { BasketItemsFromDBType, BasketItemType, UserIdParamsType } from "./types";
import { authInstance } from "../../http";

export const fetchShawarmasFromBasket = createAsyncThunk<BasketItemType[], UserIdParamsType>('users/fetchShawarmasFromBasket', async (params) => {
  const { id } = params;
  if (id) {
    const { data } = await authInstance.get<BasketItemsFromDBType[]>(
      `http://localhost:7000/api/basketshawarmas/getByUserId?id=${id}`,
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

export const fetchIncrementShawarma = createAsyncThunk<BasketItemsFromDBType, number>('basket/fetchIncrementShawarma', async (id) => {
  const { data } = await authInstance.put<BasketItemsFromDBType>(
    `http://localhost:7000/api/basketshawarmas/increment`,
    {id}
  );
  return data;
});
