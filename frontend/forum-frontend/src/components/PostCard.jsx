import React from 'react';

const cardStyles = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const mediaStyles = {
  maxWidth: '100%',
  maxHeight: '400px',
  borderRadius: '8px',
  marginTop: '12px',
};

const PostCard = ({ post }) => {
  const mediaUrl = post.Media ? `http://localhost:3000/${post.Media.url}` : null;

  return (
    <div style={cardStyles}>
      <h4>{post.User ? post.User.name : 'Usuário anônimo'}</h4>
      <p>{post.content}</p>
      {mediaUrl && <img src={mediaUrl} alt="Mídia do post" style={mediaStyles} />}
    </div>
  );
};

export default PostCard;