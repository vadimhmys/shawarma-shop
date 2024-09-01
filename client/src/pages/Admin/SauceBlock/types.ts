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

export type SauceDeletePropsType = {
  id: number;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowSauceList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SauceCreateFields = {
  name: string;
  price: number;
  image: File;
};

export type SauceCreatePropsType = {
  setIsShowCreatedSauce: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCreatedSauce: boolean;
};