import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fechReservations } from '../../redux/reservations/reservations';

const Reservations = () => {
  const dispatch = useDispatch();
  const reservationState = useSelector((state) => state.reservations);

  useEffect(() => {
    if (reservationState.statusReservations !== 'completed') {
      dispatch(fechReservations());
    }
    console.log(reservationState);
  }, []);
  console.log(reservationState);
  return (
    <section className="reservationtop">
      <div className="reservation">
        <div className="reservationdeatails">
          <p>Lawyers Name</p>
          <p>Reserve Date</p>
        </div>
        <div className="reservationbtns">
          <Button href="/" className="button-custom">Edit</Button>
          <Button href="/">Delete</Button>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
