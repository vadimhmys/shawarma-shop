import { RootState } from "../store";

export const selectUser = (state: RootState) => state.user;
export const selectUserIsAuth = (state: RootState) => state.user.isAuth;