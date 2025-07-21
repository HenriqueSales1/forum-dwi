// src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import { getPosts } from "../data_acess/post_api";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import "./HomePageCss.css"; // O import que você já tinha

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(
        fetchedPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (err) {
      setError("Não foi possível carregar os posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  // Agora as mensagens de estado usam classes CSS
  if (isLoading) return <p className="loading-message">Carregando posts...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    // Aplicando a classe principal ao container
    <div className="home-container">
      <h1>Página Inicial</h1>

      {isLoggedIn ? (
        <PostForm onPostCreated={handlePostCreated} />
      ) : (
        <p className="info-message">Faça o login para criar um novo post.</p>
      )}

      <hr />

      <h2>Posts Recentes</h2>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="info-message">Ainda não há posts para exibir.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
