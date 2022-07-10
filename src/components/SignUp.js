/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
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

  console.log(authState);

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

  return (
    <Container fluid>
      <h1>Sign up</h1>
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
        <Form.Group controlId="password_confirmation">
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
