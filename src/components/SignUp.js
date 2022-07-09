import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signUp } from '../redux/auth/auth';

const SignUp = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(authState);

  return (
    <Container fluid>
      <h1>Sign up</h1>
      <Form>
        <Form.Group controlId="name">
          <Form.Label visuallyHidden>Name</Form.Label>
          <Form.Control placeholder="Name" />
          <Form.Control.Feedback type="invalid">Custom Error</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label visuallyHidden>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
          <Form.Control.Feedback type="invalid">Custom Error</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label visuallyHidden>Phone</Form.Label>
          <Form.Control type="tel" placeholder="Phone number" />
          <Form.Control.Feedback type="invalid">Custom Error</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label visuallyHidden>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Control.Feedback type="invalid">Custom Error</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirm_password">
          <Form.Label visuallyHidden>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" />
          <Form.Control.Feedback type="invalid">Custom Error</Form.Control.Feedback>
        </Form.Group>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch(signUp(JSON.stringify({
              user: {
                name: 'Tester22',
                email: 'fake3@email.com',
                phone: 123456,
                password: '123456',
                password_confirmation: '',
              },
            })));
          }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
