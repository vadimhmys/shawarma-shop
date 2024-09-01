import { authInstance, guestInstance } from ".";

export const createIngredient = async (ingredient: FormData) => {
  const { data } = await authInstance.post('ingredients/create', ingredient);
  return data;
}

export const updateIngredient = async (id: number, ingredient: FormData) => {
  const { data } = await authInstance.put(`ingredients/update/${id}`, ingredient);
  return data;
}

export const deleteIngredient = async (id: number) => {
  const { data } = await authInstance.delete(`ingredients/delete/${id}`);
  return data;
}

export const fetchIngredients = async () => {
  const { data } = await guestInstance.get('ingredients/getall');
  return data;
}

export const fetchIngredient = async (id: number) => {
  const { data } = await guestInstance.get(`ingredients/getone/${id}`);
  return data;
}