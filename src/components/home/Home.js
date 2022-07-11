import React from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import Welcome from './Welcome';

const Home = () => {
  const userSignedIn = useSelector((state) => state.auth.userSignedIn);

  return (
    <Container fluid className="p-0">
      <Container fluid className="py-2">
        {userSignedIn
          ? <h1>signed_in</h1>
          : <Welcome />}
      </Container>
    </Container>
  );
};

export default Home;
