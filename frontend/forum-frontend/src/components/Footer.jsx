// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show footer when user has scrolled to within 50px of the bottom
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 50;
      setIsVisible(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'footer-visible' : 'footer-hidden'}`}>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Fórum DWI. Todos os direitos reservados.</p>
        <p>Desenvolvido por <a href="https://github.com/HenriqueSales1" target="_blank" rel="noopener noreferrer">Henrique Sales</a> e <a href="https://github.com/GustavoBrendon" target="_blank" rel="noopener noreferrer">Gustavo Brendon</a></p>
      </div>
    </footer>
  );
};

export default Footer;