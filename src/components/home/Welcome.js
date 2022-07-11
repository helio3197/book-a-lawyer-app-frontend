import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Container as="section" fluid className="py-2 h-100 d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h1>Book-a-Lawyer</h1>
        <p>Welcome to our app</p>
        <Button onClick={() => navigate('sign_up')}>
          GET STARTED
        </Button>
      </div>
    </Container>
  );
};

export default Welcome;
