import React, { useState } from 'react';
import '../components/Header.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  function handlebook() {
    navigate('/bookroom')
  }
  function handleAdmin() {
    navigate('/login')
  }
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Hotel Logo" />
      </div>
      <h1 className="site-name">CIRCUIT HOUSE DANTEWADA</h1>
      {/* Book Now and Admin buttons for desktop */}

      <div className="button-group desktop-only">
        <button onClick={handlebook} className="book-now">Book Now</button>
      <button onClick={handleAdmin} className="admin mobile-only">Admin</button>

      </div>
      <button className="hamburgr" onClick={toggleMobileMenu}>
        ☰
        {/* &#9776;  */}
      </button>
      {/* Mobile menu with both buttons */}
      {isMobileMenuOpen && (
        <nav className="mobile-menu">
          <button onClick={handlebook} className="book-now mobile-only">Book Now</button>
          <button onClick={handleAdmin} className="admin mobile-only">Admin</button>
        </nav>
      )}
    </header>
  );
};
export default Header;