import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  email: string,
  isAuth: boolean,
  isAdmin: boolean,
}

const initialState: UserState = {
  email: 'vadim@mail.ru',
  isAuth: true,
  isAdmin: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
