import { BasketItemsFromDBType } from './../redux/basket/types';
import { BasketItemType } from '../redux/basket/types';
import { authInstance } from './index';

export type UserOrderType = {
  userName: string;
  phone: string;
  waitingTime: number;
  comment: string;
  payment: 'CASH' | 'CARD';
  items: BasketItemType[];
};

export type AdminOrderType = {
  userName: string;
  phone: string;
  waitingTime: number;
  comment: string;
  payment: 'CASH' | 'CARD';
  items: BasketItemsFromDBType[];
};

/*
 * only for admin
 */

export const adminGetAll = async () => {
  const { data } = await authInstance.get('order/admin/getall');
  return data;
}

export const adminGetOne = async (id: number) => {
  const { data } = await authInstance.get(`order/admin/getone/${id}`);
  return data;
}

export const adminUpdate = async (id: number) => {
  const { data } = await authInstance.put(`order/admin/update/${id}`);
  return data;
}

export const adminDelete = async (id: number) => {
  const { data } = await authInstance.delete(`order/admin/delete/${id}`);
  return data;
}

/*
 * for user
 */

export const userCreate = async (body: UserOrderType) => {
  const { data } = await authInstance.post('order/user/create', body);
  return data;
}

export const userGetAll = async () => {
  const { data } = await authInstance.get('order/user/getall');
  return data;
}

