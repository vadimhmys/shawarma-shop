import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketItemType, IBasketState } from './types';

const initialState: IBasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<BasketItemType>) {
      const findItem = state.items.find(
        (item) =>
          item.id +
            item.cake +
            item.weight +
            JSON.stringify(item.addedComponentsList) +
            JSON.stringify(item.removedComponentsList) ===
          action.payload.id +
            action.payload.cake +
            action.payload.weight +
            JSON.stringify(action.payload.addedComponentsList) +
            JSON.stringify(action.payload.removedComponentsList),
      );
      if (findItem) {
        const findItemUniqueId =
          findItem.id +
          findItem.cake +
          findItem.weight +
          JSON.stringify(findItem.addedComponentsList) +
          JSON.stringify(findItem.removedComponentsList);
        const actionPayloadUniqueId =
          action.payload.id +
          action.payload.cake +
          action.payload.weight +
          JSON.stringify(action.payload.addedComponentsList) +
          JSON.stringify(action.payload.removedComponentsList);
        if (findItemUniqueId === actionPayloadUniqueId) {
          findItem.count++;
        } else {
          state.items.push(action.payload);
        }
      } else {
        state.items.push(action.payload);
      }
    },
    incrementItem(state, action: PayloadAction<string | undefined>) {
      const findItem = state.items.find(
        (item) =>
          item.id +
            item.cake +
            item.weight +
            JSON.stringify(item.addedComponentsList) +
            JSON.stringify(item.removedComponentsList) ===
          action.payload,
      );
      if (findItem) findItem.count++;
    },
    decrementItem(state, action: PayloadAction<string | undefined>) {
      const findItem = state.items.find(
        (item) =>
          item.id +
            item.cake +
            item.weight +
            JSON.stringify(item.addedComponentsList) +
            JSON.stringify(item.removedComponentsList) ===
          action.payload,
      );
      if (findItem) findItem.count--;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) =>
          item.id +
            item.cake +
            item.weight +
            JSON.stringify(item.addedComponentsList) +
            JSON.stringify(item.removedComponentsList) !==
          action.payload,
      );
    },
    clearBasket(state) {
      state.items = [];
    },
  },
});


export const { addItem, incrementItem, decrementItem, removeItem, clearBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
