export type SauceType = {
  id: number;
  name: string;
  price: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SauceListPropsType = {
  setIsShowSauceList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableSauce: React.Dispatch<React.SetStateAction<SauceType>>;
  setIsShowEditableSauce: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedSauceIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type SauceEditPropsType = {
  sauce: SauceType;
  setIsShowEditableSauce: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEditableSauce: boolean;
}

export type SauceEditFields = {
  name: string;
  price: number;
  image?: File;
};