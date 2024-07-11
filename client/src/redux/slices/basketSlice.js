import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id + item.cake + item.weight + JSON.stringify(item.addedComponentsList) ===
          action.payload.id +
            action.payload.cake +
            action.payload.weight +
            JSON.stringify(action.payload.addedComponentsList),
      );
      if (findItem) {
        const findItemUniqueId =
          findItem.id +
          findItem.cake +
          findItem.weight +
          JSON.stringify(findItem.addedComponentsList);
        const actionPayloadUniqueId =
          action.payload.id +
          action.payload.cake +
          action.payload.weight +
          JSON.stringify(action.payload.addedComponentsList);
        if (findItemUniqueId === actionPayloadUniqueId) {
          findItem.count++;
        } else {
          state.items.push(action.payload);
        }
      } else {
        state.items.push(action.payload);
      }
    },
    incrementItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id + item.cake + item.weight + JSON.stringify(item.addedComponentsList) ===
          action.payload,
      );
      findItem.count++;
    },
    decrementItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id + item.cake + item.weight + JSON.stringify(item.addedComponentsList) ===
          action.payload,
      );
      findItem.count--;
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) =>
          item.id + item.cake + item.weight + JSON.stringify(item.addedComponentsList) !==
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
