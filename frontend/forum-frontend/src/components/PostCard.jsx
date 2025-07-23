import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const PostCard = ({ post, onDelete }) => {
  const { user } = useContext(AuthContext);
  const canDelete =
    user && (user.id === post.userId || user.permissionLevel === 1);

  const handleDelete = () => {
    onDelete(post.id);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h4>{post.User ? post.User.name : "Usuário anônimo"}</h4>

        {canDelete && (
          <button className="delete-button" onClick={handleDelete}>
            Deletar
          </button>
        )}
      </div>

      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
};

export default PostCard;
