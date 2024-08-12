export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type UserOrder = {
  prettyCreatedAt: string;
	prettyUpdatedAt: string;
	id: number;
	userName: string;
	phone: string;
	waitingTime: number;
	comment: string | null;
	payment: "CASH" | "card";
	amount: string;
	status: number;
	createdAt: string;
	updatedAt: string;
	userId: number;
};

export interface IUserOrdersState {
  orders: UserOrder[],
  status: StatusEnum;
}