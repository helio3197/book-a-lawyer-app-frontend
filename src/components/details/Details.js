import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Detail from './LawyerDetails';

const Lawyer = () => {
  const userSignedIn = useSelector((state) => state.auth.userSignedIn);
  const navigate = useNavigate;

  useEffect(() => {
    if (!userSignedIn) {
      navigate('/', { state: { notice: 'Please sign in with your username and password' } });
    }
  }, []);

  return (
    <Container fluid className="p-0 h-100">
      <Detail />
    </Container>
  );
};

export default Lawyer;
