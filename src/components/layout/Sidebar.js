import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Sidebar = () => {
  // const [show, setShow] = useState(false);
  // const [showResults, setShowResults] = useState(true);
  const authState = useSelector((state) => state.auth.userSignedIn);

  // const onClick = () => {
  //   setShowResults(!showResults);
  //   setShow(!show);
  // };

  const navActive = ({ isActive }) => (isActive ? { backgroundColor: 'greenyellow', color: 'white' } : {});

  const navLinksNotSignedIn = () => (
    <>
      <NavLink to="/sign_up" style={navActive} className="link-item">
        SIGN UP
      </NavLink>
      <NavLink to="/sign_up" style={navActive} className="link-item">
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
      <Button type="button" className="link-item btn btn-link bg-transparent border-0 text-start">
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
            <div className="navbar-links">
              {authState ? navLinks() : navLinksNotSignedIn()}
            </div>
            <div className="mt-auto">
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
