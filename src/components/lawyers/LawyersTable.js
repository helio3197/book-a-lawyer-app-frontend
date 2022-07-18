import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { BiDetail, BiEdit, BiTrash } from 'react-icons/bi';

const LawyersTable = ({ lawyers }) => (
  <div className="lawyers-table">
    <div className="flex-cols">
      <div className="row-header">
        <div className="header-col col-id">Id</div>
        <div className="header-col col-name">Name</div>
        <div className="header-col col-created">Created at</div>
        <div className="header-col col-updated">Updated at</div>
      </div>
      {lawyers.map((lawyer) => (
        <div className="row-body" key={lawyer.id}>
          <div className="body-col col-id" title={lawyer.id}>{lawyer.id}</div>
          <div className="body-col col-name" title={lawyer.name}>{lawyer.name}</div>
          <div className="body-col col-created" title={new Date(lawyer.created_at).toLocaleString()}>
            {new Date(lawyer.created_at).toLocaleString()}
          </div>
          <div className="body-col col-updated" title={new Date(lawyer.updated_at).toLocaleString()}>
            {new Date(lawyer.updated_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
    <div className="fixed-col">
      <div className="row-header">
        <div className="header-col">Actions</div>
      </div>
      {lawyers.map((lawyer) => (
        <div className="row-body" key={lawyer.id}>
          <div className="body-col col-actions">
            <Link title="Details" to={`/lawyers/${lawyer.id}`}>
              <BiDetail />
            </Link>
            <Link title="Edit" to={`/lawyers/${lawyer.id}/edit`}>
              <BiEdit />
            </Link>
            <Button title="Delete" variant="link" className="p-0">
              <BiTrash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

LawyersTable.propTypes = {
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

LawyersTable.defaultProps = {
  lawyers: [],
};

export default LawyersTable;
