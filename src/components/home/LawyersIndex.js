import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';
import LawyersCarousel from './carousel/LawyersCarousel';

const LawyersIndex = () => {
  const dispatch = useDispatch();
  const lawyersState = useSelector((state) => state.lawyers);

  useEffect(() => {
    if (lawyersState.status !== 'completed') {
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
      <div className="my-auto">
        <div className="mt-3 mb-5">
          <h1 className="text-center">AVAILABLE LAWYERS</h1>
          <p className="text-center border-bottom mx-auto" style={{ width: 'max-content' }}>Select a lawyer to continue</p>
        </div>
        {lawyersState.lawyers.length
          ? (
            <Container fluid="sm" className="p-0 my-auto">
              <LawyersCarousel items={lawyersState.lawyers} />
            </Container>
          ) : (
            <Container fluid="sm">
              <p className="text-center mt-5 fs-5">There are no available lawyers yet.</p>
            </Container>
          )}
      </div>
    </Container>
  );
};

export default LawyersIndex;
