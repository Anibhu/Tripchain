import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Header.css';
import logo from '../styles/Your paragraph text.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, logout } = useAuth();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (dropdown) => {
    // For mobile devices, use click toggle
    if (window.innerWidth <= 768) {
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    }
  };

  const closeAll = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  // Handle mobile dropdown click
  const handleMobileDropdownClick = (dropdown) => {
    if (window.innerWidth <= 768) {
      toggleDropdown(dropdown);
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <img src={logo} alt="Digital Tourist Logo" className="logo" />
          <h2>TRIPCHAIN</h2>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={closeAll}>{t('home')}</Link></li>

          {user ? (
            <>
              {/* Show Admin link for ALL logged-in users */}
              <li><Link to="/admin" onClick={closeAll}>{t('admin')}</Link></li>
              
              {/* Dashboard Dropdown with Hover Effect */}
              <li 
                className={`dropdown ${activeDropdown === 'dashboard' ? 'active' : ''}`}
                onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('dashboard')}
                onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
              >
                <button 
                  className="btn pulse"
                  onClick={() => handleMobileDropdownClick('dashboard')}
                >
                  {t('Dashboard')} ▾
                </button>
                <div className="dropdown-content">
                  {user.role === 'police' && (
                    <Link to="/police-dashboard" onClick={closeAll}>Police Dashboard</Link>
                  )}
                  {user.role === 'tourism' && (
                    <Link to="/tourism-dashboard" onClick={closeAll}>Tourism Dashboard</Link>
                  )}
                  {(user.role === 'hotel' || user.role === 'airport' || user.role === 'checkpost') && (
                    <Link to="/verifier-dashboard" onClick={closeAll}>Verification Dashboard</Link>
                  )}
                  {/* Keep Admin in dropdown too for easy access */}
                  <Link to="/admin" onClick={closeAll}>Admin Dashboard</Link>
                </div>
              </li>

              {/* User Profile Dropdown */}
              <li 
                className={`dropdown ${activeDropdown === 'profile' ? 'active' : ''}`}
                onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('profile')}
                onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
              >
                <button 
                  className="btn pulse"
                  onClick={() => handleMobileDropdownClick('profile')}
                >
                  {user.name} ▾
                </button>
                <div className="dropdown-content">
                  <Link to="/profile" onClick={closeAll}>My Profile</Link>
                  <Link to="/settings" onClick={closeAll}>Settings</Link>
                  <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
                </div>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/apply" onClick={closeAll}>{t('apply')}</Link></li>
              <li><Link to="/verify" onClick={closeAll}>{t('verify')}</Link></li>
              <li><Link to="/status" onClick={closeAll}>{t('status')}</Link></li>
              
              {/* Login Dropdown for multiple login options */}
              <li 
                className={`dropdown ${activeDropdown === 'login' ? 'active' : ''}`}
                onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('login')}
                onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
              >
                <button 
                  className="btn pulse"
                  onClick={() => handleMobileDropdownClick('login')}
                >
                  {t('login')} ▾
                </button>
                <div className="dropdown-content">
                  <Link to="/login" onClick={closeAll}>Tourist Login</Link>
                  <Link to="/login" onClick={closeAll}>Police Login</Link>
                  <Link to="/login" onClick={closeAll}>Tourism Login</Link>
                  <Link to="/login" onClick={closeAll}>Verifier Login</Link>
                </div>
              </li>
            </>
          )}

          {/* Language Selector Dropdown */}
          <li 
            className={`dropdown ${activeDropdown === 'language' ? 'active' : ''}`}
            onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('language')}
            onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
          >
            <button 
              className="btn pulse"
              onClick={() => handleMobileDropdownClick('language')}
            >
              {currentLanguage.toUpperCase()} ▾
            </button>
            <div className="dropdown-content">
              {availableLanguages.map(lang => (
                <a 
                  key={lang}
                  href="#lang" 
                  onClick={(e) => {
                    e.preventDefault();
                    changeLanguage(lang);
                    closeAll();
                  }}
                  className={currentLanguage === lang ? 'active' : ''}
                >
                  {lang.toUpperCase()} - {lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Tamil'}
                </a>
              ))}
            </div>
          </li>

          {/* Quick Actions Dropdown */}
          <li 
            className={`dropdown ${activeDropdown === 'actions' ? 'active' : ''}`}
            onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('actions')}
            onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
          >
            <button 
              className="btn pulse"
              onClick={() => handleMobileDropdownClick('actions')}
            >
              Quick Actions ▾
            </button>
            <div className="dropdown-content">
              <Link to="/emergency" onClick={closeAll}>Emergency Contacts</Link>
              <Link to="/guidelines" onClick={closeAll}>Travel Guidelines</Link>
              <Link to="/faq" onClick={closeAll}>FAQ</Link>
              <Link to="/support" onClick={closeAll}>Support</Link>
            </div>
          </li>
        </ul>

        <div 
          className={`hamburger ${menuOpen ? "active" : ""}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;