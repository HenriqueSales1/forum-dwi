import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const cardStyles = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const PostCard = ({ post, onDelete }) => {
  const { user } = useContext(AuthContext); 
  const canDelete = user && (user.id === post.userId || user.permissionLevel === 1);
  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja deletar este post?"))
        
      {
    }
  };
     

return (
    <div className="post-card">
      <div className="post-header">
        <h4>{post.username ? post.username : 'Usuário anônimo'}</h4>
        {canDelete && (
          <button type="submit" className="delete-button">Deletar</button>
        )}
      </div>
      
      <h3>{post.title}</h3>

      <p>{post.content}</p>
    </div>
  );
};

export default PostCard;