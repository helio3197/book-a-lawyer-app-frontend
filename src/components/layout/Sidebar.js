/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { signOut, resetState } from '../../redux/auth/auth';
import logos from '../../assets/images/Logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userSignedIn: authState,
    status: authStatus,
    error: authError,
  } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (authStatus === 'signed_out' || authStatus === 'signed_out_failed') dispatch(resetState());
    if (authStatus === 'signed_out') {
      navigate('/', { state: { notice: 'You have signed out successfully' } });
    }
    if (authStatus === 'signed_out_failed') {
      navigate('/', { state: { notice: `Something went wrong: ${authError}` } });
    }
  }, [authStatus]);

  const navActive = ({ isActive }) => (isActive ? { backgroundColor: '#96bf01', color: 'white' } : {});

  const signoutHandler = () => {
    setShowSidebar((state) => !state);
    dispatch(signOut());
  };

  const navLinkHelper = ({
    href, children, onClick,
  }) => (
    <NavLink className="link-item" style={navActive} to={href} onClick={onClick}>
      {children}
    </NavLink>
  );

  const navLinksNotSignedIn = () => (
    <>
      <Nav.Link as={navLinkHelper} href="/sign_up">
        SIGN UP
      </Nav.Link>
      <Nav.Link as={navLinkHelper} href="/sign_in">
        SIGN IN
      </Nav.Link>
    </>
  );

  const navLinks = () => (
    <>
      <Nav.Link href="/" as={navLinkHelper}>
        LAWYERS
      </Nav.Link>
      <Nav.Link href="/reserve" as={navLinkHelper}>
        BOOK A LAWYER
      </Nav.Link>
      <Nav.Link href="/reservations" as={navLinkHelper}>
        MY RESERVATIONS
      </Nav.Link>
      <Nav.Link href="/account" as={navLinkHelper}>
        MY ACCOUNT
      </Nav.Link>
      <Button type="button" onClick={signoutHandler} className="link-item btn btn-link bg-transparent border-0 text-start">
        SIGN OUT
      </Button>
    </>
  );

  return (
    <header className="sidebar">
      <Navbar expand="lg" collapseOnSelect expanded={showSidebar} onToggle={() => setShowSidebar((state) => !state)}>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand" />
        <Navbar.Offcanvas id="offcanvasNavbar-expand">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Link to="/" className="text-reset logo" onClick={() => setShowSidebar((state) => !state)}>
                <img src={logos} alt="Profle" className="logo-pic" />
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="pe-0 pb-1 d-flex flex-column bg-light">
            <Link to="/" className="text-reset logo d-none d-lg-block mt-lg-2">
              <img src={logos} alt="Profle" className="logo-pic" />
            </Link>
            <Nav className="navbar-links position-relative flex-column">
              {authState ? navLinks() : navLinksNotSignedIn()}
              {authStatus === 'fetching_signout'
                && (
                  <div className="signout-loading">
                    <Spinner animation="border" variant="primary" role="status" className="my-auto">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}
            </Nav>
            <div className="mt-auto ms-2">
              <ul className="list-unstyled d-flex social-icons gap-3">
                <li className="text-secondary">
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
              <p className="small m-0">©2022 Lawyers | Ricky&Kenny</p>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </header>
  );
};

export default Sidebar;
