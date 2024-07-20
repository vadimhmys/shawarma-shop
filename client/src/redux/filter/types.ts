export enum SortCriteryEnum {
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
};

export type SortType = {
  value: string;
  sortCritery: SortCriteryEnum
};

export interface IFilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}