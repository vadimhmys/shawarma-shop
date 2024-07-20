import { BasketAddedComponentType } from "../basket/types";

export type RemoverIngredientType = {
  id: number;
  name: string;
  count: number;
};

export interface IShawarmaState {
  addedIngredients: BasketAddedComponentType[];
  removedComponents: string[];
}
