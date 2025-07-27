import React, { useState, useEffect } from "react";
import { getAllUsers } from "../data_acess/user_api";
import "./UserPage.css"; 

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(
          "Você não tem permissão para ver esta página ou ocorreu um erro."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-page-container">
      <h2>Gerenciamento de Usuários</h2>
      <p>Esta é uma lista de todos os usuários cadastrados no sistema.</p>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Username</th>
            <th>Email</th>
            <th>Permissão</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <span className={`perm-badge perm-${user.Perm.name}`}>
                  {user.Perm.name}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
