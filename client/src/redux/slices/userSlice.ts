import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  email: string,
  isAuth: boolean,
  isAdmin: boolean,
}

const initialState: UserState = {
  email: 'vadim@mail.ru',
  isAuth: false,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
