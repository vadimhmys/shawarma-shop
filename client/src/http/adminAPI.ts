import { authInstance } from ".";

export const createUser = async (email: string, password: string, role: "ADMIN" | "USER") => {
  const { data } = await authInstance.post('user/create', { email, password, role });
  return data;
}

export const updateUser = async (id: number, email?: string, password?: string, role?: "ADMIN" | "USER") => {
  const { data } = await authInstance.put(`user/update/${id}`, { email, password, role });
  return data;
}

export const deleteUser = async (id: number) => {
  const { data } = await authInstance.delete(`user/delete/${id}`);
  return data;
}

export const fetchUsers = async () => {
  const { data } = await authInstance.get('user/getall');
  return data;
}