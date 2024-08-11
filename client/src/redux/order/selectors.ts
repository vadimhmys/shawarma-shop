import { RootState } from "../store";

export const selectOrder = (state: RootState) => state.order;
export const selectOrderStatus = (state: RootState) => state.order.status;