import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fechReservations, deleteReservations } from '../../redux/reservations/reservations';

const Reservations = () => {
  const dispatch = useDispatch();
  const reservationState = useSelector((state) => state.reservations);

  useEffect(() => {
    if (reservationState.statusReservations !== 'completed') {
      dispatch(fechReservations());
    }
  }, []);

  const deleteReservationData = (id) => () => {;
    dispatch(deleteReservations(id));
  };

  return (
    <section className="reservationtop">
      {reservationState.reservations.map((reserve) => (
        <div key={reserve.id} className="reservation">
          <div className="reservationdeatails">
            <div>
              <p>Lawyers Name</p>
              <p>Reservation Date</p>
              <p>Reservation Time</p>
            </div>
            <div>
              <p>{reserve.id}</p>
              <p>{reserve.reservationdate.substring(0, 10)}</p>
              <p>{reserve.reservationdate.substring(11, 16)}</p>
            </div>
          </div>
          <div className="reservationbtns">
            <Button className="button-custom">Edit</Button>
            <Button onClick={deleteReservationData(reserve.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Reservations;
