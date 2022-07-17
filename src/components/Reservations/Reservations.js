/* eslint-disable max-len */
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { fechReservations } from '../../redux/reservations/reservations';
import { deleteReservations } from '../../redux/reservations/deleteReservation';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';

const Reservations = () => {
  const dispatch = useDispatch();
  const reservationState = useSelector((state) => state.reservations);
  const lawyersState = useSelector((state) => state.lawyers);

  useEffect(() => {
    if (reservationState.statusReservations !== 'completed') {
      dispatch(fechReservations());
    }
  }, []);

  useEffect(() => {
    if (lawyersState.statusLawyers !== 'completed') {
      dispatch(getLawyers());
    }
  }, []);

  // console.log(reservationState);

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
  return (
    <section className="reservationtop">
      {reservationState.reservations.map((reserve) => (
        <div key={reserve.id} className="allinclusive">
          <img src={lawyersState.lawyers.filter((item) => item.id === reserve.lawyer_id)[0].avatar_url} alt="Profle" className="lawyer-pic" />
          <div key={reserve.id} className="reservation">
            <div className="reservationdeatails">
              <div>
                <p>Lawyers Name</p>
                <p>Reservation Date</p>
                <p>Reservation Time</p>
                <p>Reservation Duration</p>
                <p>Status</p>
              </div>
              <div>
                <p>{lawyersState.lawyers.filter((item) => item.id === reserve.lawyer_id)[0].name}</p>
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
              <Button onClick={deleteReservationData(reserve.id)}>Delete</Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Reservations;
