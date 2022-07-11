import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import './Sidebar.css';
import PropTypes from 'prop-types';

const Sidebar = ({ children }) => {
  const [show, setShow] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const onClick = () => {
    setShowResults(!showResults);
    setShow(!show);
  };
  return (
    <>
      <main>
        <header className="mobile-head">
          <div className="top-head">
            <h1 className="logo">My Logo</h1>
            <div className="menu-icons">
              <div className="menudisplay">
                <button type="button" onClick={onClick}>{ showResults ? <MenuIcon /> : <CancelIcon />}</button>
              </div>
            </div>
          </div>
          {show
          && (
          <nav className="links">
            <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} to="/" className="link-item">Home</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} activeClassName="is-active" to="/Reserve" className="link-item">Reserve</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} activeClassName="is-active" to="/Reservations" className="link-item">Reservations</NavLink>
          </nav>
          )}
        </header>
        <header className="desktop-head">
          <div className="desktop-top-head">
            <h1 className="desktop-logo">My Logo</h1>
          </div>
          <nav className="desktop-links">
            <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} to="/" className="desktop-link-item">Home</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} activeClassName="is-active" to="/Reserve" className="desktop-link-item">Reserve</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} activeClassName="is-active" to="/Reservations" className="desktop-link-item">Reservations</NavLink>
          </nav>
          <footer className="desktop-footer">
            <ul className="footer-list">
              <li>Fac</li>
              <li>Twi</li>
              <li>Ins</li>
            </ul>
            <p> @2015 Copyright.Lawyers.Rich&Kenny</p>
          </footer>
        </header>
        { children }
      </main>
    </>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
