import { UserType } from '../redux/slices/userSlice';
import { guestInstance, authInstance } from './index';
import { jwtDecode } from 'jwt-decode';

export const signup = async (email: string, password: string) => {
  try {
    const response = await guestInstance.post('user/signup', { email, password, role: 'USER' });
    const token = response.data.token;
    const user = jwtDecode(token);
    localStorage.setItem('token', token);
    return user;
  } catch (e: any) {
    alert(e.response.data.message);
    return false;
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await guestInstance.post('user/login', { email, password });
    const token = response.data.token;
    const user = jwtDecode(token);
    localStorage.setItem('token', token);
    return user;
  } catch (e: any) {
    alert(e.response.data.message);
    return false;
  }
}

export const logout = () => {
  localStorage.removeItem('token');
}

export const check = async () => {
  let userToken, userData;
  try {
    userToken = localStorage.getItem('token');
    if (!userToken) {
      return false;
    }
    const response = await authInstance.get('user/check');
    userToken = response.data.token;
    userData = jwtDecode(userToken) as UserType;
    localStorage.setItem('token', userToken);
    const structuredData = {id: userData.id, email: userData.email, role: userData.role}
    return structuredData;
  } catch (e) {
    localStorage.removeItem('token');
    return false;
  }
}