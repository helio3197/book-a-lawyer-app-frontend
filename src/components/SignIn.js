import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signIn, resetState } from '../redux/auth/auth';

const SignIn = () => {
  const formInitialState = {
    email: '',
    password: '',
  };
  const authState = useSelector((state) => state.auth);
  const [formState, setFormState] = useState(formInitialState);
  const dispatch = useDispatch();

  // console.log(authState); // debugging, will remove later

  useEffect(() => () => dispatch(resetState()), []);

  useEffect(() => {
    if (authState.status === 'failed' && formState.password) {
      setFormState((state) => ({
        ...state,
        password: '',
      }));
    }
  }, [authState.status]);

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

  return (
    <Container fluid="sm">
      <Container fluid className="py-3 border rounded form-width-sm shadow">
        <h1 className="text-center">Log In</h1>
        <Form>
          <Form.Group controlId="email" className="mb-2">
            <Form.Label visuallyHidden>Email</Form.Label>
            <Form.Control value={formState.email} onChange={inputHandler} type="email" placeholder="Email" isInvalid={authState.error} />
          </Form.Group>
          <Form.Group controlId="password" className="mb-2">
            <Form.Label visuallyHidden>Password</Form.Label>
            <Form.Control value={formState.password} onChange={inputHandler} type="password" placeholder="Password" isInvalid={authState.error} />
            <Form.Control.Feedback type="invalid">{typeof authState.error === 'string' ? authState.error : ''}</Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            onClick={formHandler}
          >
            Sign In
          </Button>
        </Form>
        <p className="m-0 text-center">
          Don&apos;t have an account?
          {' '}
          <Link to="/sign_up">Sign up</Link>
        </p>
      </Container>
    </Container>
  );
};

export default SignIn;
