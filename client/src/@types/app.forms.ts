import { FieldErrors, UseFormRegister, Control, ValidationRule, ValidationValueMessage } from 'react-hook-form';
import { IOrderFields } from '../redux/order/types';

export interface IOption {
  value: number | string
  label: string
}

export type maskOptionsType = {
  mask: string;
  lazy: boolean;
}

export type InputRefType = {
  current: HTMLInputElement | null;
};

export type PrevMaskType = {
  current: { destroy: Function } | null;
};

export type inputValidationType = {
  value: number | string;
  message: string;
}

export type InputPropsType = {
  wrapperClassName: string;
  errorClassName: string;
  titleContent: string | null;
  subtitleContent: string | null;
  errors: FieldErrors<IOrderFields>;
  register: UseFormRegister<IOrderFields>;
  isRequired: boolean;
  name: keyof IOrderFields;
  titleClassName?: string;
  subtitleClassName?: string;
  inputClassName?: string;
  requiredMessage?: string;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp>;
  maxCharCount?: number;
  type?: string;
};

export type InputPhonePropsType = {
  errors: FieldErrors<IOrderFields>;
  register: UseFormRegister<IOrderFields>;
  ref: any;
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

export type TeaxtAreaPropsType = {
  title?: string;
  subtitle?: string;
  name: keyof IOrderFields;
  isRequired: boolean;
  control: Control<IOrderFields>;
  wrapperClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  textAreaClassName?: string;
  errorClassName: string;
  defaultValue: string;
  requiredMessage?: string;
  placeholder?: string;
  maxLength?: ValidationValueMessage<number>;
  maxCharCount?: number;
}