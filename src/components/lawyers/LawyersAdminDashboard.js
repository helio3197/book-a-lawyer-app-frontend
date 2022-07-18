import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { destroyLawyer, resetDestroyLawyerState } from '../../redux/lawyers/lawyerDestroy';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';
import LawyersTable from './LawyersTable';

const LawyersAdminDashboard = ({ lawyers }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const destroyLawyerState = useSelector((state) => state.lawyer_destroy);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (destroyLawyerState.status === 'failed') {
      navigate('/lawyers', { state: { notice: `Something went wrong: ${destroyLawyerState.error}` } });
    }
    if (destroyLawyerState.status === 'success') {
      navigate('/lawyers', { state: { notice: 'Lawyer deleted successfully' } });
      dispatch(getLawyers());
    }
  }, [destroyLawyerState.status]);

  useEffect(() => () => {
    dispatch(resetDestroyLawyerState());
  }, []);

  const deleteLawyerHandler = (id) => {
    dispatch(destroyLawyer(id));
    setShowDeleteConfirm(null);
  };

  return (
    <Container fluid="sm" className="py-3 border rounded shadow my-auto bg-light">
      <div className="d-flex mb-3">
        <h2 className="mx-auto my-0">Lawyers</h2>
        <Link to="/lawyers/new" className="text-light fw-bold btn btn-primary">Add a lawyer</Link>
      </div>
      <LawyersTable lawyers={lawyers} deleteHandler={setShowDeleteConfirm} />
      {!lawyers.length
        && (
          <div className="w-100 text-center nodata-row">
            There are no lawyers yet.
          </div>
        )}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action is irreversible.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)} className="fw-bold">
            Cancel
          </Button>
          <Button variant="primary" onClick={() => deleteLawyerHandler(showDeleteConfirm)} className="text-light fw-bold">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

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
