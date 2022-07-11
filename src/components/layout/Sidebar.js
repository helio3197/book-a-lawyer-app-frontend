import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

const Sidebar = ({ children }) => {
  const [show, setShow] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const authState = useSelector((state) => state.auth.userSignedIn);

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
          <>
            <nav className="links">
              <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} to="/" className="link-item">Home</NavLink>
              {authState
                ? (
                  <>
                    <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Reserve" className="link-item">Reserve</NavLink>
                    <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Reservations" className="link-item">Reservations</NavLink>
                    <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Manage" className="link-item">Manage</NavLink>
                  </>
                ) : null }
            </nav>
            <div className="d-grid gap-2 logoutb">
              <Button variant="success" size="lg">LOGOUT</Button>
              {' '}
            </div>
          </>
          )}
        </header>
        <header className="desktop-head">
          <div className="desktop-top-head">
            <h1 className="desktop-logo">The Lawyer</h1>
          </div>
          <nav className="desktop-links">
            {authState
              ? (
                <>
                  <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} to="/" className="desktop-link-item">HOME</NavLink>
                  <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Reserve" className="desktop-link-item">RESERVE</NavLink>
                  <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Reservations" className="desktop-link-item">RESERVATIONS</NavLink>
                  <NavLink style={({ isActive }) => ((isActive) ? { backgroundColor: 'green', color: 'white' } : {})} activeClassName="is-active" to="/Manage" className="desktop-link-item">MANAGE</NavLink>
                </>
              )
              : (
                <div className="d-grid gap-2 logoutb">
                  <Button variant="success" size="lg">SIGN IN</Button>
                  {' '}
                </div>
              )}
          </nav>
          {authState
            ? (
              <div className="d-grid gap-2 logoutb">
                <Button variant="success" size="lg">LOGOUT</Button>
                {' '}
              </div>
            ) : null }
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
            <p> ©2022 Lawyers.Ricky&Kenny</p>
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
