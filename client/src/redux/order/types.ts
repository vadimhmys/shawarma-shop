import { BasketItemType } from './../basket/types';

export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IOrderFields {
  userName: string
  phone: string
  waitingTime: number
  comment: string
  payment: 'CASH' | 'CARD'
}

export interface IOrderState {
  items: BasketItemType[]
  userName: string
  phone: string
  waitingTime: number
  comment: string
  payment: 'CASH' | 'CARD'
  status: StatusEnum
}
