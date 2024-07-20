export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type ShawarmaType = {
  id: number;
  name: string;
  title: string;
  categoryId: number;
  icon: string;
  image: string;
  novelty: boolean;
  presence: boolean;
  props: CardPropertyType[];
  components: CardComponentType[];
  createdAt: string;
  updatedAt: string;
};

export type CardPropertyType = {
  id: number;
  shawarmaId: number;
  price: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
};

export type CardComponentType = {
  id: number;
  name: string;
  necessity: boolean;
  shawarmaId: number;
  createdAt: string;
  updatedAt: string;
};

export type DataType = {
  count: number;
  rows: ShawarmaType[];
};

export type SearchShawarmaParamsType = {
  categoryId: string;
  sortBy: string;
  order: string;
  searchValue: string;
  limit: string;
  currentPage: string;
}

export interface IShawarmasState {
  shawarmas: ShawarmaType[],
  count: number;
  status: StatusEnum;
}