import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';

const LawyersIndex = () => {
  const navigate = useNavigate();

  return (
    <Container as="section" fluid className="py-2 lawyers">
      <div className="text-center">
        <h1 className="mt-3">Available lawyers</h1>
      </div>
    </Container>
  );
};

export default LawyersIndex;
