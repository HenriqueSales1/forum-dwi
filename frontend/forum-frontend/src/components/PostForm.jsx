import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createPost } from '../data_acess/post_api';

const PostForm = ({ onPostCreated }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id;
    const postData = { title, content, userId };

    try {
      const newPost = await createPost(postData);
      alert('Post criado com sucesso!');
      setTitle(''); 
      setContent('');
      onPostCreated(newPost);
    } catch (error) {
      alert('Erro ao criar o post.');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="post-form"> 
      <h3>Criar novo post</h3>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título do post"
        required
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`No que você está pensando, ${user.name}?`}
        rows="4"
        required
      ></textarea><br/>
      <button type="submit">Postar</button>
    </form>
  );
};

export default PostForm;