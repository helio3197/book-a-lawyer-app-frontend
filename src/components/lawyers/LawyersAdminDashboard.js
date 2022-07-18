import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import LawyersTable from './LawyersTable';

const LawyersAdminDashboard = ({ lawyers }) => (
  <Container fluid="sm" className="py-3 border rounded shadow my-auto bg-light">
    <div className="d-flex mb-3">
      <h2 className="mx-auto my-0">Lawyers</h2>
      <Link to="/lawyers/new" className="text-light fw-bold btn btn-primary">Add a lawyer</Link>
    </div>
    <LawyersTable lawyers={lawyers} />
    {!lawyers.length
      && (
        <div className="w-100 text-center">
          There are not lawyers yet.
        </div>
      )}
  </Container>
);

LawyersAdminDashboard.propTypes = {
  lawyers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.number,
    email: PropTypes.string,
    location: PropTypes.string,
    rates: PropTypes.number,
    bio: PropTypes.string,
    avatar_url: PropTypes.string,
    id: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  })),
};

LawyersAdminDashboard.defaultProps = {
  lawyers: [],
};

export default LawyersAdminDashboard;
