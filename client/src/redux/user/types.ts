export enum RolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type UserType = {
  id: number;
  email: string;
  role: RolesEnum;
};

export interface IUserState {
  id: null | number,
  email: null | string,
  isAuth: boolean,
  isAdmin: boolean,
}