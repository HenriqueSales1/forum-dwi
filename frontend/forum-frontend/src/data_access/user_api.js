import api from "./api";

export const login = async (username_or_email, password) => {
  const response = await api.post("/api/users/login", {
    username_or_email,
    password,
  });
  return response.data;
};

export const register = async (userData) => {
  try {
    const response = await api.post("/api/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/users/profile");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
    try {
        const response = await api.get('/api/users');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};