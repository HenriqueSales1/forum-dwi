// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Fórum DWI. Todos os direitos reservados.</p>
        <p>Desenvolvido por <a href="https://github.com/HenriqueSales1" target="_blank" rel="noopener noreferrer">Henrique Sales</a> e <a href="https://github.com/GustavoBrendon" target="_blank" rel="noopener noreferrer">Gustavo Brendon</a></p>
      </div>
    </footer>
  );
};

export default Footer;