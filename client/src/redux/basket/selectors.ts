import { RootState } from "../store";

export const selectBasketItems = (state: RootState) => state.basket.items;