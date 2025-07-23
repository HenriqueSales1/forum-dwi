import api from './api'; 

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
};

export async function deletePost(req, res) {
  const post = await api.delete('/posts');
  if (post) {
    await post.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Postagem não encontrada.");
  }
}