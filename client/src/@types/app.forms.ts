import { FieldErrors, UseFormRegister, Control } from 'react-hook-form';

export interface IOrderFields {
  userName: string
  phone: string
  waitingTime: number
  comment: string
  payment: string
}

export interface IOption {
  value: number | string;
  label: string;
}

export type InputRefType = {
  current: HTMLInputElement | null;
};

export type PrevMaskType = {
  current: { destroy: Function } | null;
};

export type InputNamePropsType = {
  errors: FieldErrors<IOrderFields>;
  register: UseFormRegister<IOrderFields>;
};

export type InputPhonePropsType = {
  errors: FieldErrors<IOrderFields>;
  register: UseFormRegister<IOrderFields>;
  ref: any;
};

export type SelectTimePropsType = {
  control: Control<IOrderFields>;
};

export type SelectPropsType = {
  title: string;
  name: keyof IOrderFields;
  options: IOption[];
  isRequired: boolean;
  control: Control<IOrderFields>;
  classNamePrefix: string;
  isSearchable: boolean;
  wrapperClassName: string;
  titleClassName: string;
  errorClassName: string;
  defaultValue: number | string;
  requiredMessage?: string;
  placeholder?: string;
};