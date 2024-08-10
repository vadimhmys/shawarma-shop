import { BasketItemsFromDBType } from './../redux/basket/types';
import { BasketItemType } from '../redux/basket/types';
import { authInstance } from './index';

type OrderType = {
  userName: string;
  phone: string;
  waitingTime: number;
  comment: string;
  payment: 'CASH' | 'CARD';
  items: BasketItemType[] | BasketItemsFromDBType[];
};

/*
 * only for admin
 */

export const adminCreate = async (body: OrderType) => {
  const { data } = await authInstance.post('order/admin/create', body);
  return data;
}

export const adminGetAll = async () => {
  const { data } = await authInstance.get('order/admin/getall');
  return data;
}

export const adminGetUser = async (id: number) => {
  const { data } = await authInstance.get(`order/admin/getall/user/${id}`);
  return data;
}

export const adminGetOne = async (id: number) => {
  const { data } = await authInstance.get(`order/admin/getone/${id}`);
  return data;
}

export const adminDelete = async (id: number) => {
  const { data } = await authInstance.delete(`order/admin/delete/${id}`);
  return data;
}

/*
 * for user
 */

export const userCreate = async (body: OrderType) => {
  const { data } = await authInstance.post('order/user/create', body);
  return data;
}

export const userGetAll = async () => {
  const { data } = await authInstance.get('order/user/getall');
  return data;
}

export const userGetOne = async (id: number) => {
  const { data } = await authInstance.get(`order/user/getone/${id}`);
  return data;
}
