import api from './api';

export const login = async (username_or_email, password) => {
  const response = await api.post('/users/login', { username_or_email, password });
  return response.data; 
};

export const register = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
};