import { authInstance, guestInstance } from ".";
import { ShawarmaAPIType, ShawarmaComponentAPIType, ShawarmaPropertyAPIType } from "../@types/app.forms";

/*
 * Create, update and delete a category, get a list of all categories
 */

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

/*
 * Create, update and delete a shawarma, get a list of all shawarmas
 */

export const createShawarma = async (shawarma: ShawarmaAPIType) => {
  const { data } = await authInstance.post('shawarmas/create', shawarma);
  return data;
}

export const updateShawarma = async (id: number, shawarma: FormData) => {
  const { data } = await authInstance.put(`shawarmas/update/${id}`, shawarma);
  return data;
}

export const deleteShawarma = async (id: number) => {
  const { data } = await authInstance.delete(`shawarmas/delete/${id}`);
  return data;
}

export const fetchShawarmas = async () => {
  const { data } = await authInstance.get('shawarmas/getallForAdmin');
  return data;
}

export const fetchShawarma = async (id: number) => {
  const { data } = await guestInstance.get(`shawarmas/getone/${id}`);
  return data;
}

/*
 * Create property for shawarma
 */

export const createShawarmaProperty = async (property: ShawarmaPropertyAPIType) => {
  const { data } = await authInstance.post('shawarmas/property/create', property);
  return data;
}

/*
 * Create component for shawarma
 */

export const createShawarmaComponent = async (component: ShawarmaComponentAPIType) => {
  const { data } = await authInstance.post('shawarmas/component/create', component);
  return data;
}

