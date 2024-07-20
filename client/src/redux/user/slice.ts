import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState, UserType } from './types';

const initialState: IUserState = {
  id: null,
  email: null,
  isAuth: false,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<UserType>) {
      const { id, email, role } = action.payload;
      state.id = id;
      state.email = email;
      state.isAuth = true;
      state.isAdmin = role === 'ADMIN';
    },
    logoutUser(state) {
      state.id = null;
      state.email = null;
      state.isAuth = false;
      state.isAdmin = false;
    }
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
