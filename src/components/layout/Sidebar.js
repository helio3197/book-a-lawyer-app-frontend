import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { signOut, resetState } from '../../redux/auth/auth';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userSignedIn: authState,
    status: authStatus,
    error: authError,
  } = useSelector((state) => state.auth);

  console.log(authStatus);

  useEffect(() => {
    if (authStatus === 'signed_out' || authStatus === 'failed') dispatch(resetState());
    if (authStatus === 'signed_out') {
      navigate('/', { state: { notice: 'You have signed out successfully' } });
    }
    if (authStatus === 'failed') {
      navigate('/', { state: { notice: `Something went wrong: ${authError}` } });
    }
  }, [authStatus]);

  const navActive = ({ isActive }) => (isActive ? { backgroundColor: 'greenyellow', color: 'white' } : {});

  const signoutHandler = () => {
    dispatch(signOut());
  };

  const navLinksNotSignedIn = () => (
    <>
      <NavLink to="/sign_up" style={navActive} className="link-item">
        SIGN UP
      </NavLink>
      <NavLink to="/sign_in" style={navActive} className="link-item">
        SIGN IN
      </NavLink>
    </>
  );

  const navLinks = () => (
    <>
      <NavLink to="/" style={navActive} className="link-item">
        LAWYERS
      </NavLink>
      <NavLink to="/reserve" style={navActive} className="link-item">
        BOOK A LAWYER
      </NavLink>
      <NavLink to="/reservations" style={navActive} className="link-item">
        MY RESERVATIONS
      </NavLink>
      <NavLink to="/account" style={navActive} className="link-item">
        MY ACCOUNT
      </NavLink>
      <Button type="button" onClick={signoutHandler} className="link-item btn btn-link bg-transparent border-0 text-start">
        SIGN OUT
      </Button>
    </>
  );

  return (
    <header className="sidebar">
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand" />
        <Navbar.Offcanvas id="offcanvasNavbar-expand">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Link to="/" className="text-reset logo">
                The Lawyers
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="pe-0 pb-1 d-flex flex-column">
            <Link to="/" className="text-reset logo d-none d-lg-block mt-lg-2">
              The Lawyers
            </Link>
            <div className="navbar-links position-relative">
              {authState ? navLinks() : navLinksNotSignedIn()}
              {authStatus === 'fetching_signout'
                && (
                  <div className="signout-loading">
                    <Spinner animation="border" variant="primary" role="status" className="my-auto">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}
            </div>
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
