import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import './Sidebar.css';
import PropTypes from 'prop-types';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
// import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
// import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

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
            <h1 className="logo"><em>The Lawyer</em></h1>
            <div className="menu-icons">
              <div className="menudisplay">
                <button type="button" onClick={onClick}>{ showResults ? <MenuIcon className="humburger-icon" /> : <CancelIcon className="humburger-icon" />}</button>
              </div>
            </div>
          </div>
          {show
          && (
          <nav className="links">
            <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} to="/" className="link-item">Home</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Reserve" className="link-item">Reserve</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Reservations" className="link-item">Reservations</NavLink>
          </nav>
          )}
        </header>
        <header className="desktop-head">
          <div className="desktop-top-head">
            <h1 className="desktop-logo">The Lawyer</h1>
          </div>
          <nav className="desktop-links">
            <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} to="/" className="desktop-link-item">HOME</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Reserve" className="desktop-link-item">RESERVE</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Reservations" className="desktop-link-item">RESERVATIONS</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Manage" className="desktop-link-item">MANAGE</NavLink>
          </nav>
          <footer className="desktop-footer">
            <ul className="footer-list">
              <li>
                <a href="/">
                  <EmailIcon className="the-item" />
                </a>
              </li>
              <li>
                <a href="/">
                  <FacebookIcon className="the-item" />
                </a>

              </li>
              <li>
                <a href="/">
                  <TwitterIcon className="the-item" />
                </a>

              </li>
              <li>
                <a href="/">
                  <InstagramIcon className="the-item" />
                </a>

              </li>
              <li>
                <a href="/">
                  <LinkedInIcon className="the-item" />
                </a>

              </li>
            </ul>
            <p> ©2015 Lawyers.Ricky&Kenny</p>
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
