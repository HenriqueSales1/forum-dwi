import React, { useState, useEffect } from "react";
import { getPerms, createPerm } from "../data_acess/perms_api";
import "./PermissionsPage.css";

const PermissionsPage = () => {
  const [perms, setPerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchPerms();
  }, []);

  const fetchPerms = async () => {
    try {
      const data = await getPerms();
      setPerms(data);
    } catch (err) {
      setError(
        "Você não tem permissão para ver esta página ou ocorreu um erro."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePerm = async (e) => {
    e.preventDefault();
    if (!newName) {
      setFormError('O campo "Nome" é obrigatório.');
      return;
    }

    try {
      const newPerm = await createPerm({
        name: newName,
        description: newDescription,
      });
      setPerms((currentPerms) => [...currentPerms, newPerm]);
      setNewName("");
      setNewDescription("");
      setFormError("");
    } catch (err) {
      setFormError(
        "Não foi possível criar a permissão. O nome já pode existir."
      );
    }
  };

  if (isLoading) return <p>Carregando permissões...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-page-container">
      <div className="create-perm-form">
        <h3>Cadastrar Nova Permissão</h3>
        <form onSubmit={handleCreatePerm}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="perm-name">Nome</label>
              <input
                id="perm-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="ex: moderador"
              />
            </div>
            <div className="form-group">
              <label htmlFor="perm-desc">Descrição</label>
              <input
                id="perm-desc"
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="ex: Acesso total ao sistema"
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Cadastrar
          </button>
          {formError && <p className="error-message form-error">{formError}</p>}
        </form>
      </div>

      <div className="list-section">
        <h2>Permissões Existentes</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {perms.map((perm) => (
              <tr key={perm.id}>
                <td>{perm.id}</td>
                <td>{perm.name}</td>
                <td>{perm.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionsPage;
