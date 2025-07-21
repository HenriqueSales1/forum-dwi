// src/pages/LoginPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../data_acess/user_api';
import './LoginPage.css'; // O import que você já tinha

const LoginPage = () => {
  const [username_or_email, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username_or_email, password);
      localStorage.setItem('token', data.token);
      alert('Login bem-sucedido!');
      // Usamos window.location.replace para forçar o recarregamento da navbar
      window.location.replace('/');
    } catch (error) {
      if (error.response) {
        alert('Falha no login: ' + error.response.data.message);
      } else {
        alert('Não foi possível conectar ao servidor.');
      }
    }
  };

  return (
    // 1. Adicionado um container principal para centralizar e estilizar
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>

        {/* 2. Grupos de formulário para organizar label e input (substitui os <br />) */}
        <div className="form-group">
          <label htmlFor="login">Email ou Nome de Usuário</label>
          <input
            id="login"
            type="text" // Mudado para 'text' para aceitar email ou username
            className="form-input"
            value={username_or_email}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Digite seu email ou usuário"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;