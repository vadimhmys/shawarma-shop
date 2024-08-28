import { CardComponentType, CardPropertyType, ShawarmaType } from "../../../redux/shawarmas/types";

export type ShawarmaListPropsType = {
  setIsShowShawarmaList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableShawarma: React.Dispatch<React.SetStateAction<ShawarmaType>>;
  setIsShowEditableShawarma: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedShawarmaIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type ShawarmaEditPropsType = {
  shawarma: ShawarmaType;
  setIsShowEditableShawarma: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEditableShawarma: boolean;
};

export type ShawarmaDeletePropsType = {
  id: number;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowShawarmaList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ShawarmaCreatePropsType = {
  setIsShowCreatedShawarma: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCreatedShawarma: boolean;
};

export type ShawarmaCreateFields = {
  name: string;
  title: string;
  category: string;
  image: File;
  icon: File;
  novelty: boolean;
  presence: boolean;
};

export type PropertyType = {
  weight: number;
  price: string;
  unique: string;
};

export type ComponentType = {
  name: string;
  necessity: boolean;
  unique: string;
};

export type CreateShawarmaComponentsPropsType = {
  components: ComponentType[];
  setComponents: React.Dispatch<React.SetStateAction<ComponentType[]>>;
};

export type CreateShawarmaPropertiesPropsType = {
  properties: PropertyType[];
  setProperties: React.Dispatch<React.SetStateAction<PropertyType[]>>;
};

export type ShawarmaEditFields = {
  name: string;
  title: string;
  category: string;
  image?: File;
  icon?: File;
  novelty?: boolean;
  presence?: boolean;
};

export type CategoryOptionType = {
  value: number;
  label: string;
};

export type UpdateShawarmaComponentsPropsType = {
  shawarmaId: number;
  components: CardComponentType[];
  setComponents: React.Dispatch<React.SetStateAction<CardComponentType[]>>;
};

export type UpdateShawarmaPropertiesPropsType = {
  shawarmaId: number;
  properties: CardPropertyType[];
  setProperties: React.Dispatch<React.SetStateAction<CardPropertyType[]>>;
};