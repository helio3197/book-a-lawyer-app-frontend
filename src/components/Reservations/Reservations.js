/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import { fechReservations } from '../../redux/reservations/reservations';
import { deleteReservations, clearDeleteReservationState, clearFetchReservationState } from '../../redux/reservations/deleteReservation';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';

const Reservations = () => {
  const dispatch = useDispatch();
  const reservationState = useSelector((state) => state.reservations);
  const lawyersState = useSelector((state) => state.lawyers);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('p');
  const [showCurrentPage, setShowCurrentPage] = useState(+currentPage || 1);
  const [maxPagesNumber, setMaxPagesNumber] = useState(null);
  const initialArrayIndex = ((showCurrentPage * 5) - 5);
  const itemsToRender = reservationState.reservations.slice(initialArrayIndex, initialArrayIndex + 5);

  useEffect(() => {
    if (reservationState.status !== 'completed') {
      dispatch(fechReservations());
    }
    if (lawyersState.status !== 'completed') {
      dispatch(getLawyers());
    }
    return () => {
      dispatch(clearFetchReservationState());
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

  const deleteReservationData = (id) => () => {
    dispatch(deleteReservations(id));
    dispatch(clearDeleteReservationState());
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

  return (
    <section className="reservationtop">
      <div className="reservation-container">
        {itemsToRender.map((reserve) => (
          <div key={reserve.id} className="allinclusive">
            {/* <img src={lawyersState.lawyers.filter((item) => item.id === reserve.lawyer_id)[0].avatar_url} alt="Profle" className="lawyer-pic" /> */}
            <div key={reserve.id} className="reservation">
              <div className="reservationdeatails">
                <div>
                  <p>Lawyers Name</p>
                  <p>Date</p>
                  <p>Time</p>
                  <p>Duration</p>
                  <p>Status</p>
                </div>
                <div>
                  <div className="d-flex align-items-center">
                    <img src={lawyersState.lawyers.filter((item) => item.id === reserve.lawyer_id)[0].avatar_url} alt="Profle" className="lawyer-thumb" />
                    <p className="m-0 ms-2">{lawyersState.lawyers.filter((item) => item.id === reserve.lawyer_id)[0].name}</p>
                  </div>
                  <p>{reserve.reservationdate.substring(0, 10)}</p>
                  <p>{reserve.reservationdate.substring(11, 16)}</p>
                  <p>
                    {reserve.duration}
                    {' '}
                    hrs
                  </p>
                  {reserve.is_active ? <p>Active</p> : <p>Inactive</p> }
                </div>
              </div>
              <div className="reservationbtns">
                <Button className="button-custom">Edit</Button>
                <Button variant="secondary" onClick={deleteReservationData(reserve.id)}>Delete</Button>
              </div>
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
    </section>
  );
};

export default Reservations;
