import { authInstance, guestInstance } from ".";

export const createCategory = async (name: string) => {
  const { data } = await authInstance.post('categories/create', { name });
  return data;
}

export const updateCategory = async (id: number, name: string) => {
  const { data } = await authInstance.put(`categories/update/${id}`, { name });
  return data;
}

export const deleteCategory = async (id: number) => {
  const { data } = await authInstance.delete(`categories/delete/${id}`);
  return data;
}

export const fetchCategories = async () => {
  const { data } = await guestInstance.get('categories/getall');
  return data;
}

export const fetchCategory = async (id: number) => {
  const { data } = await guestInstance.get(`categories/getone/${id}`);
  return data;
}