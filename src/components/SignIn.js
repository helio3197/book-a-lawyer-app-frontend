import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signIn } from '../redux/auth/auth';

const SignIn = () => {
  const formInitialState = {
    email: '',
    password: '',
  };
  const authState = useSelector((state) => state.auth);
  const [formState, setFormState] = useState(formInitialState);
  const dispatch = useDispatch();

  console.log(authState); // debugging, will remove later

  if (authState.userSignedIn) {
    if (authState.status === 'idle') {
      return ( // Should redirect to homepage with respective notice: User already signed in
        <div>
          <h1>(PLACEHOLDER) Already signed_in, redirecting to home</h1>
        </div>
      );
    }
    return ( // Should redirect to homepage with respective notice: User registered successfully
      <div>
        <h1>(PLACEHOLDER) Success, should redirect to home</h1>
      </div>
    );
  }

  useEffect(() => {
    if (authState.status === 'failed') {
      setFormState((state) => ({
        ...state,
        password: '',
      }));
    }
  }, [authState.status]);

  const inputHandler = (e) => {
    const key = e.target.id;
    setFormState((state) => ({
      ...state,
      [key]: e.target.value,
    }));
  };

  const formHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formState).forEach((key) => {
      form.append(`user[${key}]`, formState[key]);
    });

    dispatch(signIn(form));
  };

  const renderError = (key) => `${key} ${authState.error?.[key]?.join(', ')}`;
  const validateInput = (key) => !!authState.error?.[key];

  return (
    <Container fluid="sm">
      <Container fluid className="py-3 border rounded form-width-sm shadow">
        <h1 className="text-center">Log In</h1>
        <Form>
          <Form.Group controlId="email" className="mb-2">
            <Form.Label visuallyHidden>Email</Form.Label>
            <Form.Control value={formState.email} onChange={inputHandler} type="email" placeholder="Email" isInvalid={validateInput('email')} />
            <Form.Control.Feedback type="invalid">{renderError('email')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password" className="mb-2">
            <Form.Label visuallyHidden>Password</Form.Label>
            <Form.Control value={formState.password} onChange={inputHandler} type="password" placeholder="Password" isInvalid={validateInput('password')} />
            <Form.Control.Feedback type="invalid">{renderError('password')}</Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            onClick={formHandler}
          >
            Sign In
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default SignIn;
