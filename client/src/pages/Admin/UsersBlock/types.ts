export type UsersType = {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
  password?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type UsersListPropsType = {
  setIsShowUsersList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableUsers: React.Dispatch<React.SetStateAction<UsersType>>;
  setIsShowEditableUsers: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedUsersIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type UsersEditFields = {
  email?: string;
  role?: "ADMIN" | "USER";
  password?: string;
};

export type UsersEditPropsType = {
  users: UsersType;
  setIsShowEditableUsers: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEditableUsers: boolean;
};

export type UsersDeletePropsType = {
  id: number;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowUsersList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UsersCreateFields = {
  email: string;
  role: "ADMIN" | "USER";
  password: string;
};

export type UsersCreatePropsType = {
  setIsShowCreatedUsers: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCreatedUsers: boolean;
};