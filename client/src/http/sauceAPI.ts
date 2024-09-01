import { authInstance, guestInstance } from ".";

export const createSauce = async (sauce: FormData) => {
  const { data } = await authInstance.post('sauces/create', sauce);
  return data;
}

export const updateSauce = async (id: number, sauce: FormData) => {
  const { data } = await authInstance.put(`sauces/update/${id}`, sauce);
  return data;
}

export const deleteSauce = async (id: number) => {
  const { data } = await authInstance.delete(`sauces/delete/${id}`);
  return data;
}

export const fetchSauces = async () => {
  const { data } = await guestInstance.get('sauces/getall');
  return data;
}

export const fetchSauce = async (id: number) => {
  const { data } = await guestInstance.get(`sauces/getone/${id}`);
  return data;
}