/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { GrFormClose } from 'react-icons/gr';
import { signUp } from '../redux/auth/auth';
import defaultAvatar from '../assets/images/profile-pic.png';

const SignUp = () => {
  const formInitialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    avatar: {
      value: '',
      preview: defaultAvatar,
      file: null,
    },
  };
  const authState = useSelector((state) => state.auth);
  const [formState, setFormState] = useState(formInitialState);
  const dispatch = useDispatch();

  console.log(authState); // debugging, will remove later

  useEffect(() => {
    if (authState.status === 'failed' && (formState.password || formState.password_confirmation)) {
      setFormState((state) => ({
        ...state,
        password: '',
        password_confirmation: '',
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

  const removeSelectedPicture = () => {
    setFormState((state) => ({
      ...state,
      avatar: formInitialState.avatar,
    }));
  };

  const previewHandler = (e) => {
    if (e.target.value) {
      const file = e.target.files[0];
      setFormState((state) => ({
        ...state,
        avatar: {
          value: e.target.value,
          preview: URL.createObjectURL(file),
          file,
        },
      }));
      return undefined;
    }

    removeSelectedPicture();
    return undefined;
  };

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
    Object.keys(formState).filter((e) => e !== 'avatar').forEach((key) => {
      form.append(`user[${key}]`, formState[key]);
    });
    if (formState.avatar.file) {
      form.append('user[avatar]', formState.avatar.file);
    }

    dispatch(signUp(form));
  };

  const renderError = (key) => `${key} ${authState.error?.[key]?.join(', ')}`;
  const validateInput = (key) => !!authState.error?.[key];

  return (
    <Container fluid="sm">
      <Container fluid className="py-3 border rounded form-width-sm shadow">
        <h1 className="text-center">Create an account</h1>
        <Form>
          <div className="avatar mb-3">
            <div className="preview">
              <img src={formState.avatar.preview} alt="avatar preview" />
            </div>
            <div className="image-upload">
              <div className="file-picker">
                <label htmlFor="avatar">Upload picture</label>
                <input id="avatar" type="file" onChange={previewHandler} value={formState.avatar.value} accept="image/jpeg, image/png, image/gif" />
              </div>
              <div className="file-selection">
                <small>{formState.avatar.file ? formState.avatar.file.name : 'No file chosen...'}</small>
                <button type="button" className={formState.avatar.value ? '' : 'd-none'} onClick={removeSelectedPicture}>
                  <GrFormClose />
                </button>
              </div>
            </div>
          </div>
          <Form.Group controlId="name" className="mb-2">
            <Form.Label visuallyHidden>Name</Form.Label>
            <Form.Control value={formState.name} onChange={inputHandler} placeholder="Name" isInvalid={validateInput('name')} />
            <Form.Control.Feedback type="invalid">{renderError('name')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email" className="mb-2">
            <Form.Label visuallyHidden>Email</Form.Label>
            <Form.Control value={formState.email} onChange={inputHandler} type="email" placeholder="Email" isInvalid={validateInput('email')} />
            <Form.Control.Feedback type="invalid">{renderError('email')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phone" className="mb-2">
            <Form.Label visuallyHidden>Phone</Form.Label>
            <Form.Control value={formState.phone} onChange={inputHandler} type="tel" placeholder="Phone number" isInvalid={validateInput('phone')} />
            <Form.Control.Feedback type="invalid">{renderError('phone')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password" className="mb-2">
            <Form.Label visuallyHidden>Password</Form.Label>
            <Form.Control value={formState.password} onChange={inputHandler} type="password" placeholder="Password" isInvalid={validateInput('password')} />
            <Form.Control.Feedback type="invalid">{renderError('password')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password_confirmation" className="mb-2">
            <Form.Label visuallyHidden>Confirm password</Form.Label>
            <Form.Control value={formState.password_confirmation} onChange={inputHandler} type="password" placeholder="Confirm password" isInvalid={validateInput('password_confirmation')} />
            <Form.Control.Feedback type="invalid">{renderError('password_confirmation')}</Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            onClick={formHandler}
          >
            Sign Up
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default SignUp;
