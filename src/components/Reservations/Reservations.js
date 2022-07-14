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
  return (
    <>
      <h1>This is the Reservations page!</h1>
      <section>
        <div>
          <div>
            <p>Lawyers Name</p>
            <p>Reserve Date</p>
          </div>
          <div>
            <Button />
            <Button />
          </div>
        </div>
      </section>
    </>
  );
};

export default Reservations;
