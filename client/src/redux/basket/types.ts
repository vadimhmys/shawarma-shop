import { StatusEnum } from "../shawarmas/types";

export type BasketAddedComponentType = {
  id: number;
  name: string;
  count: number;
  price: number;
};

export type BasketItemType = {
  id: number;
  title: string;
  image: string;
  weight: number;
  price: string;
  cake: string;
  count: number;
  addedComponentsList: BasketAddedComponentType[];
  removedComponentsList: string[];
};

export type UserIdParamsType = {
  id: string | null;
};

export type BasketItemsFromDBType = {
  id: number;
  uniqueShawaKey: string;
  shawarmaId: number;
  title: string;
  image: string;
  weight: number;
  price: string;
  cake: string;
  count: number;
  addedComponentsList: string;
  removedComponentsList: string;
  createdAt: string;
  updatedAt: string;
  basketId: number;
};

export interface IBasketState {
  items: BasketItemType[],
  status: StatusEnum,
}