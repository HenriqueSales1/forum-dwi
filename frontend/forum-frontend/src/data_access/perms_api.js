import api from "./api";

export const getPerms = async () => {
  try {
    const response = await api.get("/api/perms");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar permissões:", error);
    throw error;
  }
};

export const createPerm = async (permData) => {
    try {
        const response = await api.post('/api/perms', permData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar permissão:", error);
        throw error;
    }
};
