export type IngredientType = {
  id: number;
  name: string;
  price: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type IngredientListPropsType = {
  setIsShowIngredientList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableIngredient: React.Dispatch<React.SetStateAction<IngredientType>>;
  setIsShowEditableIngredient: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedIngredientIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type IngredientEditPropsType = {
  ingredient: IngredientType;
  setIsShowEditableIngredient: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEditableIngredient: boolean;
}

export type IngredientEditFields = {
  name: string;
  price: number;
  image?: File;
};

export type IngredientDeletePropsType = {
  id: number;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowIngredientList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type IngredientCreateFields = {
  name: string;
  price: number;
  image: File;
};

export type IngredientCreatePropsType = {
  setIsShowCreatedIngredient: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCreatedIngredient: boolean;
};