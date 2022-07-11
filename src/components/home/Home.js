import React from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import Welcome from './Welcome';
import LawyersIndex from './LawyersIndex';

const Home = () => {
  const userSignedIn = useSelector((state) => state.auth.userSignedIn);

  return (
    <Container fluid className="p-0 h-100">
      {userSignedIn
        ? <LawyersIndex />
        : <Welcome />}
    </Container>
  );
};

export default Home;
