import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Container as="section" fluid className="py-2 welcome">
      <div className="text-center text-light">
        <h1>Book-a-Lawyer</h1>
        <p>Welcome to The Lawyers, the only app you will need for your legal stuff</p>
        <Button type="button" onClick={() => navigate('sign_up')} className="text-light fw-bold px-4">
          GET STARTED
        </Button>
      </div>
    </Container>
  );
};

export default Welcome;
