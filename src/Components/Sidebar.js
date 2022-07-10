import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import '../App.css';
import './Sidebar.css';
import PropTypes from 'prop-types';

const Sidebar = ({ children }) => {
//   const [show, setShow] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const onClick = () => setShowResults(!showResults);

  return (
    <>

      <main>
        <header className="d-flex">
          <div className="top-head">
            <h1>My Logo</h1>
            <div className="menu-icons">
              {/* <span>
                <MenuIcon onClick={() => setShow((prev) => !prev)} />
                { show && <CancelIcon />}

              </span> */}

              <div>
                <button type="button" onClick={onClick}>{ showResults ? <MenuIcon /> : <CancelIcon /> }</button>
                {/* <input type="submit" value="Search" onClick={onClick} />
                { showResults ? <MenuIcon /> : <CancelIcon /> } */}
              </div>
              {/* <CancelIcon className="close-icon" /> */}
            </div>
          </div>
          <nav className="links">
            <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} to="/" className="link-item">Home</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} activeClassName="is-active" to="/Reserve" className="link-item">Reserve</NavLink>
            <NavLink style={({ isActive }) => ((isActive) ? { color: 'red' } : {})} activeClassName="is-active" to="/Reservations" className="link-item">Reservations</NavLink>
          </nav>
        </header>
        { children }
      </main>
    </>
  );
};

// const Results = () => (
//   <MenuIcon />
// );

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
