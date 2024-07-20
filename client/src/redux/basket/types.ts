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

export interface IBasketState {
  items: BasketItemType[]
}