import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Fórum
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            {user.permsId === 1 && (
              <>
                <NavLink to="/admin/users" className="navbar-button">
                  Usuários
                </NavLink>
                <NavLink to="/admin/permissions" className="navbar-button">
                  Permissões
                </NavLink>
              </>
            )}
            {user.name && <span className="navbar-welcome">Olá, {user.name}!</span>}
            <button onClick={logout} className="navbar-button logout">
              Sair
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar-button">
              Login
            </NavLink>
            <NavLink to="/register" className="navbar-button register">
              Registrar
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
