export type CategoryType = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CategoryListPropsType = {
  setIsShowCategoryList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
  setIsShowEditableCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type CategoryInputEdit = {
  categoryEdit: string;
};

export type CategoryInputCreate = {
  categoryCreate: string;
};

export type CategoryEditPropsType = {
  id: number;
  name: string;
  setIsShowEditableCategory: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEditableCategory: boolean;
};

export type CategoryDeletePropsType = {
  id: number;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowCategoryList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CategoryCreatePropsType = {
  setIsShowCreatedCategory: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCreatedCategory: boolean;
};