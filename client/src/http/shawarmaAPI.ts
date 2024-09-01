import { authInstance, guestInstance } from ".";
import { ShawarmaComponentAPIType, ShawarmaPropertyAPIType } from "../@types/app.forms";

/*
 * Create, update and delete a shawarma, get a list of all shawarmas
 */

export const createShawarma = async (shawarma: FormData) => {
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

