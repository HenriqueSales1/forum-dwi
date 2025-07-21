import React, { useState } from 'react';
import { createPost } from '../data_acess/post_api';

const formStyles = {
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '24px',
};

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      alert("O conteúdo do post não pode estar vazio.");
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    if (media) {
      formData.append('media', media); [cite_start]
    }

    try {
      const newPost = await createPost(formData);
      alert('Post criado com sucesso!');
      setContent('');
      setMedia(null);
      document.querySelector('input[type="file"]').value = ''; 
      onPostCreated(newPost);
    } catch (error) {
      alert('Erro ao criar o post. Verifique se você está logado.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h3>Criar novo post</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="O que você está pensando?"
        rows="4"
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        required
      ></textarea>
      <input type="file" onChange={(e) => setMedia(e.target.files[0])} />
      <button type="submit" style={{ marginTop: '10px', float: 'right' }}>Postar</button>
    </form>
  );
};

export default PostForm;