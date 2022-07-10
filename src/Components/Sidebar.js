import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
// import Button from '@material-ui/core/Button';
import '../App.css';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-bootstrap';

const Sidebar = ({ children }) => (
  <main>
    <header className="d-flex">
      <h1>My Logo</h1>
    </header>
    <div>
      <MenuIcon />
      <CancelIcon />
    </div>
    <nav className="links">
      <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} to="/" className="link-item">Home</NavLink>
      <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} activeClassName="is-active" to="/Reserve" className="link-item">Reserve</NavLink>
      <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} activeClassName="is-active" to="/Reservations" className="link-item">Reservations</NavLink>
    </nav>
    { children }
  </main>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
