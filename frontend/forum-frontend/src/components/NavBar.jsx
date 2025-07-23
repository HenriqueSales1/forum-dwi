import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Fórum</Link>
      </div>
      <div className="navbar-links">
        {user ? ( 
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;