export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type OrderDetailsType = {
  title: string;
  weight: number;
  price: string;
  count: number;
  cake: string;
  addedComponentsList: string;
  removedComponentsList: string;
}

export type UOType = {
  prettyCreatedAt: string;
  prettyUpdatedAt: string;
  id: number;
  userName: string;
  phone: string;
  waitingTime: number;
  comment: string | null;
  payment: "CASH" | "CARD";
  amount: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  items: OrderDetailsType[];
};

export interface IUserOrdersState {
  orders: UOType[],
  status: StatusEnum;
}