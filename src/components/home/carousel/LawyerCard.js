import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import defaultAvatar from '../../../assets/images/profile-pic.png';

const LawyerCard = ({
  name, avatarUrl, location, rates, id,
}) => (
  <div className="lawyer-card">
    <Link to={`/lawyers/${id}`} className="d-block text-decoration-none text-reset">
      <img src={avatarUrl} alt={name} />
    </Link>
    <Link to={`/lawyers/${id}`} className="d-block text-decoration-none text-reset">
      <p className="name">{name.toUpperCase()}</p>
    </Link>
    <p className="info">{`${location} | $${rates} / hr`}</p>
    <div>
      <ul className="list-unstyled d-flex gap-3 justify-content-center">
        <li>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-icon">
            <span hidden>Facebook</span>
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-icon">
            <span hidden>Twitter</span>
            <FaTwitter />
          </a>
        </li>
        <li>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-icon">
            <span hidden>Instagram</span>
            <FaInstagram />
          </a>
        </li>
      </ul>
    </div>
  </div>
);

LawyerCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  location: PropTypes.string.isRequired,
  rates: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

LawyerCard.defaultProps = {
  avatarUrl: defaultAvatar,
};

export default LawyerCard;
