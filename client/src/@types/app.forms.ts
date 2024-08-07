import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface IOrderFields {
  name: string
  phone: string
  time: string
  comment: string
  payment: string
}

export type InputRefType = {
  current: HTMLInputElement | null;
};

export type PrevMaskType = {
  current: { destroy: Function } | null;
};

export type InputPhonePropsType = {
  errors: FieldErrors<IOrderFields>;
  register: UseFormRegister<IOrderFields>;
  ref: any;
};