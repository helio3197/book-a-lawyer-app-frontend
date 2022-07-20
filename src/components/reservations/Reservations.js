/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from 'react-datepicker';
import { fechReservations } from '../../redux/reservations/reservations';
import { deleteReservations, clearDeleteReservationState } from '../../redux/reservations/deleteReservation';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';
import { updateReservation, resetUpdateReservationState } from '../../redux/reservations/reservationUpdate';

const Reservations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservationState = useSelector((state) => state.reservations);
  const editReservationState = useSelector((state) => state.reservation_update);
  const lawyersState = useSelector((state) => state.lawyers);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('p');
  const [showCurrentPage, setShowCurrentPage] = useState(+currentPage || 1);
  const [maxPagesNumber, setMaxPagesNumber] = useState(null);
  const initialArrayIndex = ((showCurrentPage * 5) - 5);
  const itemsToRender = reservationState.reservations.slice(initialArrayIndex, initialArrayIndex + 5);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    reservationdate: null,
    reservationtime: null,
    duration: '',
    id: '',
  });

  useEffect(() => {
    if (reservationState.status !== 'completed') {
      dispatch(fechReservations());
    }
    if (lawyersState.status !== 'completed') {
      dispatch(getLawyers());
    }
    return () => {
      dispatch(clearDeleteReservationState());
      dispatch(resetUpdateReservationState());
    };
  }, []);

  useEffect(() => {
    if (reservationState.status === 'completed') {
      setMaxPagesNumber(Math.ceil(reservationState.reservations.length / 5));
    }
  }, [reservationState.status]);

  useEffect(() => {
    if (maxPagesNumber && (showCurrentPage > maxPagesNumber)) {
      setSearchParams({ p: maxPagesNumber });
      setShowCurrentPage(maxPagesNumber);
    }
  }, [maxPagesNumber]);

  useEffect(() => {
    if (typeof editReservationState.error === 'string') {
      navigate('/reservations', { state: { notice: `Something went wrong: ${editReservationState.error}` } });
    }
    if (editReservationState.status === 'success') {
      navigate('/reservations', { state: { notice: 'Reservation updated successfully!' } });
      dispatch(fechReservations());
      setShowEditModal(false);
    }
  }, [editReservationState.status]);

  const deleteReservationData = (id) => () => {
    dispatch(deleteReservations(id));
  };

  if (lawyersState.status === 'idle' || lawyersState.status === 'fetching') {
    return (
      <Container as="section" fluid className="py-2 lawyers align-items-center">
        <h1 className="mt-3">Please Wait...</h1>
        <Spinner animation="border" variant="primary" role="status" className="my-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (lawyersState.status === 'failed') {
    return (
      <Container as="section" fluid className="py-2 lawyers">
        <h2 className="mt-2">{`Something went wrong: ${lawyersState.error}`}</h2>
      </Container>
    );
  }

  const pageHandler = (page) => {
    setShowCurrentPage(page);
    setSearchParams({ p: page });
  };

  const renderError = (key) => `${key} ${editReservationState.error?.[key]?.join(', ')}`;
  const validateInput = (key) => !!editReservationState.error?.[key];

  const datePickerCustomInput = ({
    value, onClick, onChange, placeholder,
  }, ref) => (
    <Form.Control
      value={value}
      onClick={onClick}
      ref={ref}
      onChange={onChange}
      placeholder={placeholder}
      isInvalid={validateInput('reservationdate')}
    />
  );

  const CustomInput = React.forwardRef(datePickerCustomInput);

  const editFormHandler = () => {
    const {
      reservationdate, reservationtime, duration, id,
    } = formData;
    const newReservationDate = reservationtime
      ? new Date((reservationdate?.setHours(reservationtime?.getHours())))
      : null;

    dispatch(updateReservation(JSON.stringify({
      reservation: {
        reservationdate: newReservationDate,
        duration,
      },
    }), id));
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    if (editReservationState.status === 'failed') {
      dispatch(resetUpdateReservationState());
    }
  };

  return (
    <section className="reservationtop gap-3">
      <h2 className="text-center m-0">Reservations</h2>
      <div className="reservation-container px-3 gap-3">
        {itemsToRender.map((reserve) => (
          <div key={reserve.id} className="allinclusive p-2">
            <div className="reservationdeatails">
              <div>
                <p>Lawyer:</p>
                <div className="d-flex align-items-center ms-4">
                  <img src={lawyersState.lawyers.filter((item) => item.id === reserve.lawyer_id)[0].avatar_url} alt="Profle" className="lawyer-thumb" />
                  <p className="m-0 ms-2">{lawyersState.lawyers.filter((item) => item.id === reserve.lawyer_id)[0].name}</p>
                </div>
                <div className="ms-auto fw-bold">{`#${reserve.id}`}</div>
              </div>
              <div>
                <p>Appointment date:</p>
                <p>{new Date(reserve.reservationdate).toLocaleDateString()}</p>
              </div>
              <div>
                <p>Time:</p>
                <p>{new Date(reserve.reservationdate).toLocaleTimeString().replace(/(.*)\D\d+/, '$1')}</p>
              </div>
              <div>
                <p>Duration:</p>
                <p>
                  {reserve.duration}
                  {' '}
                  hrs
                </p>
              </div>
            </div>
            <div className="reservationbtns pt-2 justify-content-center">
              <Button
                className="px-5 text-light fw-bold"
                onClick={() => {
                  setFormData({
                    reservationdate: new Date(reserve.reservationdate),
                    reservationtime: new Date(reserve.reservationdate),
                    duration: reserve.duration,
                    id: reserve.id,
                  });
                  setShowEditModal(true);
                }}
              >
                Edit
              </Button>
              <Button className="px-5" variant="secondary" onClick={deleteReservationData(reserve.id)}>Cancel</Button>
            </div>
          </div>
        ))}
      </div>
      <Pagination className="reservations-pagination">
        <Pagination.First disabled={showCurrentPage === 1} onClick={() => pageHandler(1)} />
        <Pagination.Prev disabled={showCurrentPage === 1} onClick={() => pageHandler(showCurrentPage - 1)} />
        {showCurrentPage >= 3 && <Pagination.Item onClick={() => pageHandler(showCurrentPage - 2)}>{showCurrentPage - 2}</Pagination.Item>}
        {showCurrentPage >= 2 && <Pagination.Item onClick={() => pageHandler(showCurrentPage - 1)}>{showCurrentPage - 1}</Pagination.Item>}
        <Pagination.Item active>{showCurrentPage}</Pagination.Item>
        {showCurrentPage <= (maxPagesNumber - 1) && <Pagination.Item onClick={() => pageHandler(showCurrentPage + 1)}>{showCurrentPage + 1}</Pagination.Item>}
        {showCurrentPage <= (maxPagesNumber - 2) && <Pagination.Item onClick={() => pageHandler(showCurrentPage + 2)}>{showCurrentPage + 2}</Pagination.Item>}
        <Pagination.Next disabled={showCurrentPage === maxPagesNumber} onClick={() => pageHandler(showCurrentPage + 1)} />
        <Pagination.Last disabled={showCurrentPage === maxPagesNumber} onClick={() => pageHandler(maxPagesNumber)} />
      </Pagination>
      <Modal centered show={showEditModal} onHide={() => closeEditModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{`Edit reservation #${formData.id}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="position-relative">
          <Form id="edit-reservation">
            <Form.Group controlId="reservationdate">
              <Form.Label visuallyHidden>
                Appoint date
              </Form.Label>
              <DatePicker
                selected={formData.reservationdate}
                onChange={(date) => setFormData((state) => ({
                  ...state,
                  reservationdate: date?.getHours() < 8 ? new Date(date.setHours(9)) : date,
                }))}
                customInput={<CustomInput />}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                placeholderText="Appointment date"
                wrapperClassName="flex-grow-1"
              />
            </Form.Group>
            <Form.Group controlId="reservationtime">
              <Form.Label visuallyHidden>
                Appoint date
              </Form.Label>
              <DatePicker
                selected={formData.reservationtime}
                onChange={(date) => setFormData((state) => ({
                  ...state,
                  reservationtime: date?.getHours() < 8 ? new Date(date.setHours(9)) : date,
                }))}
                customInput={<CustomInput />}
                minDate={new Date()}
                placeholderText="Appointment time"
                wrapperClassName="flex-grow-1"
                showTimeSelect
                showTimeSelectOnly
                dateFormat="h:mm aa"
                timeIntervals={60}
                minTime={new Date().setHours(8)}
                maxTime={new Date().setHours(17)}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid" className={validateInput('reservationdate') ? 'd-block' : ''}>
              {renderError('reservationdate')}
            </Form.Control.Feedback>
            <InputGroup className="flex-grow-1" style={{ width: '150px' }}>
              <Form.Select
                value={formData.duration}
                onChange={(e) => setFormData((state) => ({
                  ...state,
                  duration: e.target.value,
                }))}
                isInvalid={validateInput('duration')}
              >
                <option value="">Duration</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Select>
              <InputGroup.Text>Hours</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid" className={validateInput('duration') ? 'd-block' : ''}>{renderError('duration')}</Form.Control.Feedback>
          </Form>
          {editReservationState.status === 'fetching'
          && (
            <div className="signout-loading">
              <Spinner animation="border" variant="primary" role="status" className="my-auto">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeEditModal()} className="fw-bold">
            Cancel
          </Button>
          <Button form="edit-reservation" variant="primary" onClick={() => editFormHandler()} className="text-light fw-bold">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Reservations;
