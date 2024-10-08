import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketItemsFromDBType, BasketItemType, IBasketState } from './types';
import { fetchClearBasket, fetchDecrementShawarma, fetchDeleteShawarma, fetchIncrementShawarma, fetchShawarmasFromBasket, fetchShawarmasFromLS } from './asyncAction';
import { StatusEnum } from '../shawarmas/types';
import { getBasketFromLS } from '../../utils/getBasketFromLS';
import { fetchOrder } from '../order/asyncAction';

const initialState: IBasketState = {
  items: getBasketFromLS(),
  status: StatusEnum.LOADING,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchShawarmasFromBasket.pending, (state) => {
        state.items = [];
        state.status = StatusEnum.LOADING;
      })
      .addCase(fetchShawarmasFromBasket.fulfilled, (state, action: PayloadAction<BasketItemType[]>) => {
        state.items = action.payload;
        state.status = StatusEnum.SUCCESS;
      })
      .addCase(fetchShawarmasFromBasket.rejected, (state) => {
        state.items = [];
        state.status = StatusEnum.ERROR;
      })
      .addCase(fetchIncrementShawarma.fulfilled, (state, action: PayloadAction<BasketItemsFromDBType>) => {
        const { id, cake, weight, addedComponentsList, removedComponentsList } = action.payload;
        const keyForSearch = id + cake + weight + addedComponentsList + removedComponentsList;
        const findItem = state.items.find(
          (item) =>
            item.id +
            item.cake +
            item.weight +
            JSON.stringify(item.addedComponentsList) +
            JSON.stringify(item.removedComponentsList) ===
            keyForSearch,
        );
        if (findItem) findItem.count++;
      })
      .addCase(fetchIncrementShawarma.rejected, (state) => {
        state.items = [];
        state.status = StatusEnum.ERROR;
      })
      .addCase(fetchDecrementShawarma.fulfilled, (state, action: PayloadAction<BasketItemsFromDBType>) => {
        const { id, cake, weight, addedComponentsList, removedComponentsList } = action.payload;
        const keyForSearch = id + cake + weight + addedComponentsList + removedComponentsList;
        const findItem = state.items.find(
          (item) =>
            item.id +
            item.cake +
            item.weight +
            JSON.stringify(item.addedComponentsList) +
            JSON.stringify(item.removedComponentsList) ===
            keyForSearch,
        );
        if (findItem) findItem.count--;
      })
      .addCase(fetchDecrementShawarma.rejected, (state) => {
        state.items = [];
        state.status = StatusEnum.ERROR;
      })
      .addCase(fetchDeleteShawarma.fulfilled, (state, action: PayloadAction<BasketItemsFromDBType>) => {
        const { id, cake, weight, addedComponentsList, removedComponentsList } = action.payload;
        const keyForSearch = id + cake + weight + addedComponentsList + removedComponentsList;
        state.items = state.items.filter(
          (item) =>
            item.id +
            item.cake +
            item.weight +
            JSON.stringify(item.addedComponentsList) +
            JSON.stringify(item.removedComponentsList) !==
            keyForSearch,
        );
      })
      .addCase(fetchDeleteShawarma.rejected, (state) => {
        state.items = [];
        state.status = StatusEnum.ERROR;
      })
      .addCase(fetchClearBasket.pending, (state) => {
        state.status = StatusEnum.LOADING;
      })
      .addCase(fetchClearBasket.fulfilled, (state, action: PayloadAction<[]>) => {
        state.items = action.payload;
        state.status = StatusEnum.SUCCESS;
      })
      .addCase(fetchClearBasket.rejected, (state) => {
        state.status = StatusEnum.ERROR;
      })
      .addCase(fetchShawarmasFromLS.pending, (state) => {
        state.status = StatusEnum.LOADING;
      })
      .addCase(fetchShawarmasFromLS.fulfilled, (state, action: PayloadAction<BasketItemType[]>) => {
        state.items = action.payload;
        state.status = StatusEnum.SUCCESS;
      })
      .addCase(fetchShawarmasFromLS.rejected, (state) => {
        state.items = [];
        state.status = StatusEnum.ERROR;
      })
      .addCase(fetchOrder.fulfilled, (state) => {
        state.items = [];
      })
  },
});


export const { addItem, incrementItem, decrementItem, removeItem, clearBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
