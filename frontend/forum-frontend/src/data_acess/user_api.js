import api from "./api";
import axios from "axios";

const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username_or_email, password) => {
  const response = await api.post("/users/login", {
    username_or_email,
    password,
  });
  return response.data;
};

export const register = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};

export default apiAxios;