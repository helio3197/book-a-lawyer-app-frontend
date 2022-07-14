import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fechReservations } from '../../redux/reservations/reservations';

const Reservations = () => {
  const dispatch = useDispatch();
  const reservationState = useSelector((state) => state.reservations);

  useEffect(() => {
    // if (reservationState !== 'completed') {
    dispatch(fechReservations());
    console.log(reservationState);
    // }
  }, []);
  // console.log(reservationState);
  return (
    <>
      <h1>This is the Reservations page!</h1>
    </>
  );
};

export default Reservations;
