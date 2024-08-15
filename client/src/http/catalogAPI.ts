import { authInstance, guestInstance } from ".";

/*
 * Create, update and delete a category, get a list of all categories
 */

export const createCategory = async (category: string) => {
  const { data } = await authInstance.post('category/create', category)
  return data
}

export const updateCategory = async (id: number, category: string) => {
  const { data } = await authInstance.put(`category/update/${id}`, category)
  return data
}

export const deleteCategory = async (id: number) => {
  const { data } = await authInstance.delete(`category/delete/${id}`)
  return data
}

export const fetchCategories = async () => {
  const { data } = await guestInstance.get('category/getall')
  return data
}

export const fetchCategory = async (id: number) => {
  const { data } = await guestInstance.get(`category/getone/${id}`)
  return data
}