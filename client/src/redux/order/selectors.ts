import { RootState } from "../store";

export const selectOrderStatus = (state: RootState) => state.order.status;