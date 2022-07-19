/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import {
  Navigate, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { GrFormClose } from 'react-icons/gr';
import { getLawyers } from '../../../redux/lawyers/lawyersIndex';
import { getLawyer, resetShowLawyerState } from '../../../redux/lawyers/lawyerShow';
import { updateLawyer, resetUpdateLawyerState } from '../../../redux/lawyers/lawyerUpdate';

const LawyerEdit = () => {
  const { userSignedIn, currentUser, status: userAuthStatus } = useSelector((state) => state.auth);
  const lawyerUpdateState = useSelector((state) => state.lawyer_update);
  const lawyerShowState = useSelector((state) => state.lawyer_show);
  const lawyersIndexState = useSelector((state) => state.lawyers);
  const { lawyerId } = useParams();
  const lawyerToEdit = lawyersIndexState.status === 'completed'
    ? lawyersIndexState.lawyers.find((lawyer) => lawyer.id === +lawyerId)
    : {};

  const formInitialState = {
    name: lawyerToEdit?.name || '',
    bio: lawyerToEdit?.bio || '',
    location: lawyerToEdit?.location || '',
    email: lawyerToEdit?.email || '',
    phone: lawyerToEdit?.phone || '',
    rates: lawyerToEdit?.rates || '',
    avatar: {
      value: '',
      preview: lawyerToEdit?.avatar_url,
      file: null,
    },
  };
  const [formState, setFormState] = useState(formInitialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (typeof lawyerUpdateState.error === 'string') {
      navigate('/lawyers/new', { state: { notice: `Something went wrong: ${lawyerUpdateState.error}` } });
    }
    if (lawyerUpdateState.status === 'success') {
      navigate('/lawyers', { state: { notice: 'Lawyer updated successfully!' } });
      dispatch(getLawyers());
    }
  }, [lawyerUpdateState.status]);

  useEffect(() => {
    if (lawyersIndexState.status !== 'completed') {
      dispatch(getLawyer(lawyerId));
    }
    return () => {
      dispatch(resetUpdateLawyerState());
      dispatch(resetShowLawyerState());
    };
  }, []);

  useEffect(() => {
    if (lawyerShowState.status === 'success') {
      setFormState({
        name: lawyerShowState.lawyer.name,
        bio: lawyerShowState.lawyer.bio,
        location: lawyerShowState.lawyer.location,
        email: lawyerShowState.lawyer.email,
        phone: lawyerShowState.lawyer.phone,
        rates: lawyerShowState.lawyer.rates,
        avatar: {
          value: '',
          preview: lawyerShowState.lawyer.avatar_url,
          file: null,
        },
      });
    }
    if (lawyerShowState.status === 'failed') {
      navigate(location.pathname, { state: { notice: `Something went wrong: ${lawyerShowState.error}` } });
    }
  }, [lawyerShowState.status]);

  if (!userSignedIn && userAuthStatus !== 'signed_out') {
    return <Navigate to="/sign_in" state={{ notice: 'You need to sign in or sign up before continuing.' }} />;
  }

  if (userSignedIn && currentUser.role !== 'admin') {
    return <Navigate to="/" state={{ notice: 'Permission denied, you need admin privileges to access this page.' }} />;
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
      form.append(`lawyer[${key}]`, formState[key]);
    });
    if (formState.avatar.file) {
      form.append('lawyer[avatar]', formState.avatar.file);
    }

    dispatch(updateLawyer(form, lawyerId));
  };

  const renderError = (key) => `${key} ${lawyerUpdateState.error?.[key]?.join(', ')}`;
  const validateInput = (key) => !!lawyerUpdateState.error?.[key];

  return (
    <Container fluid className="h-100 d-flex py-2 overflow-auto">
      <Container fluid="sm" className="py-3 border rounded form-width-sm shadow my-auto bg-light">
        <h1 className="text-center">Edit lawyer</h1>
        <Form className="mb-2 position-relative">
          <div className="avatar mb-3">
            <div className="preview">
              <img src={formState.avatar.preview} alt="avatar preview" />
            </div>
            <div className="image-upload flex-grow-1">
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
              <Form.Control.Feedback type="invalid" className={validateInput('avatar') ? 'd-block' : ''}>{renderError('avatar')}</Form.Control.Feedback>
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
          <Form.Group controlId="location" className="mb-2">
            <Form.Label visuallyHidden>Location</Form.Label>
            <Form.Control value={formState.location} onChange={inputHandler} placeholder="Location" isInvalid={validateInput('location')} />
            <Form.Control.Feedback type="invalid">{renderError('location')}</Form.Control.Feedback>
          </Form.Group>
          <InputGroup hasValidation className="mb-2">
            <Form.Label htmlFor="rates" visuallyHidden>Rates per hour</Form.Label>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control id="rates" value={formState.rates} onChange={inputHandler} placeholder="Rates per hour" isInvalid={validateInput('rates')} />
            <Form.Control.Feedback type="invalid">{renderError('rates')}</Form.Control.Feedback>
          </InputGroup>
          <Form.Group controlId="bio" className="mb-2">
            <Form.Label visuallyHidden>Bio or brief introduction</Form.Label>
            <Form.Control as="textarea" value={formState.bio} onChange={inputHandler} placeholder="Bio or brief introduction" isInvalid={validateInput('bio')} />
            <Form.Control.Feedback type="invalid">{renderError('bio')}</Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            onClick={formHandler}
            className="text-light fw-bold px-4"
          >
            Save
          </Button>
          {(lawyerUpdateState.status === 'fetching' || lawyerShowState.status === 'fetching')
            && (
              <div className="signout-loading">
                <Spinner animation="border" variant="primary" role="status" className="my-auto">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
        </Form>
      </Container>
    </Container>
  );
};

export default LawyerEdit;
