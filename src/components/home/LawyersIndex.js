import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';

const LawyersIndex = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const lawyersState = useSelector((state) => state.lawyers);

  useEffect(() => {
    if (lawyersState.statusLawyers !== 'completed') {
      dispatch(getLawyers());
    }
  }, []);

  if (lawyersState.status === 'idle' || lawyersState.status === 'fetching') {
    return (
      <Container as="section" fluid className="py-2 lawyers align-items-center">
        <h1 className="mt-3">Available lawyers</h1>
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
    <Container as="section" fluid className="py-2 lawyers">
      <h1 className="mt-3 text-center">Available lawyers</h1>
      {lawyersState.lawyers.length
        ? <h2>{lawyersState.lawyers[0].name}</h2>
        : <p className="text-center mt-5 fs-5">There are no available lawyers yet.</p>}
    </Container>
  );
};

export default LawyersIndex;
