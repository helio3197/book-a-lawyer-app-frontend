/* eslint-disable max-len */
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fechReservations, deleteReservations } from '../../redux/reservations/reservations';

const Reservations = () => {
  const dispatch = useDispatch();
  const reservationState = useSelector((state) => state.reservations);
  const lawyersState = useSelector((state) => state.lawyers);

  useEffect(() => {
    if (reservationState.statusReservations !== 'completed') {
      dispatch(fechReservations());
    }
  }, []);

  console.log(lawyersState.lawyers);
  // console.log(reservationState);

  const deleteReservationData = (id) => () => {
    dispatch(deleteReservations(id));
  };

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
              </div>
              <div>
                <p>{lawyersState.lawyers.filter((item) => item.id === reserve.lawyer_id)[0].name}</p>
                <p>{reserve.reservationdate.substring(0, 10)}</p>
                <p>{reserve.reservationdate.substring(11, 16)}</p>
                <p>{reserve.duration}</p>
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
