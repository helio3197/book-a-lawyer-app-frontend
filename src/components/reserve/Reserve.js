import React, { useEffect, useState } from 'react';
import {
  useSearchParams, useNavigate, useLocation, Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from 'react-datepicker';
import { IoClose } from 'react-icons/io5';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDropMenu from './CustomDropMenu';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';
import { createReservation, resetCreateReservationState } from '../../redux/reservations/reservationsCreate';

const Reserve = () => {
  const [params] = useSearchParams();
  const selectedLawyer = params.get('lawyer');
  const { userSignedIn, status: userAuthStatus } = useSelector((state) => state.auth);
  const lawyersState = useSelector((state) => state.lawyers);
  const reservationState = useSelector((state) => state.reservations_create);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { lawyers } = lawyersState;
  const mediaQuerySm = window.matchMedia('(min-width: 600px)');
  const [dropdownPosition, setDropdownPosition] = useState(mediaQuerySm.matches ? 'end' : 'down');
  const initialReservationData = {
    lawyer_id: selectedLawyer,
    reservationdate: null,
    duration: '',
    is_active: true,
  };
  const [reservationData, setReservationData] = useState(initialReservationData);

  useEffect(() => {
    if (lawyersState.status === 'failed') {
      navigate(`${location.pathname}${location.search}`, { state: { notice: `Something went wrong: ${lawyersState.error}` } });
    }
  }, [lawyersState.status]);

  useEffect(() => {
    if (reservationState.status === 'success') {
      navigate('/', { state: { notice: 'Reservation created successfully!' } });
    }
    if (typeof reservationState.error === 'string') {
      navigate(`${location.pathname}${location.search}`, { state: { notice: `Something went wrong: ${reservationState.error}` } });
    }
  }, [reservationState.status]);

  useEffect(() => {
    if (lawyersState.status !== 'completed') {
      dispatch(getLawyers());
    }
    const handleMediaQuery = (e) => {
      if (e.matches) {
        setDropdownPosition('end');
        return undefined;
      }
      setDropdownPosition('down');
      return undefined;
    };
    mediaQuerySm.addEventListener('change', handleMediaQuery);
    return () => {
      mediaQuerySm.removeEventListener('change', handleMediaQuery);
      dispatch(resetCreateReservationState());
    };
  }, []);

  if (!userSignedIn && userAuthStatus !== 'signed_out') {
    return <Navigate to="/sign_in" state={{ notice: 'You need to sign in or sign up before continuing.' }} />;
  }

  const removeSelectedLawyer = (id) => {
    const lawyerToRemove = lawyers.find((lawyer) => lawyer.id === +id);
    const clickHandler = () => setReservationData((state) => ({ ...state, lawyer_id: null }));

    return (
      <Button type="button" variant="secondary" className="d-flex align-items-center gap-2 py-1 w-100" onClick={clickHandler}>
        <img src={lawyerToRemove.avatar_url} alt={lawyerToRemove.name} style={{ width: '35px', height: '35px' }} className="lawyer-thumbnail" />
        <p className="m-0 text-truncate">{`${lawyerToRemove.name} | $${lawyerToRemove.rates}/hr`}</p>
        <IoClose className="text-light fs-4 ms-auto" />
      </Button>
    );
  };

  const renderError = (key) => `${key} ${reservationState.error?.[key]?.join(', ')}`;
  const validateInput = (key) => !!reservationState.error?.[key];

  const datePickerCustomInput = ({
    value, onClick, onChange, placeholder,
  }, ref) => (
    <Form.Control
      value={value}
      onClick={onClick}
      ref={ref}
      onChange={onChange}
      placeholder={placeholder}
      isInvalid={validateInput('reservationdate')}
    />
  );

  const CustomInput = React.forwardRef(datePickerCustomInput);

  const totalOutputHandler = () => {
    if (lawyers) {
      if (reservationData.lawyer_id) {
        if (reservationData.duration) {
          return `$${(lawyers.find((lawyer) => lawyer.id === +reservationData.lawyer_id)
            .rates * reservationData.duration).toFixed(2)}`;
        }
      }
    }

    return '';
  };

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(createReservation(JSON.stringify(reservationData)));
  };

  return (
    <Container fluid className="h-100 reserve-bg d-flex py-2 overflow-auto">
      <Container fluid="sm" className="py-3 border rounded form-width-sm shadow my-auto bg-light">
        <Form className={reservationState.status === 'fetching' ? 'reserve-form position-relative' : 'reserve-form'}>
          <div className="mb-2">
            {(reservationData.lawyer_id && lawyers)
              ? removeSelectedLawyer(reservationData.lawyer_id)
              : (
                <Dropdown
                  drop={dropdownPosition}
                  onSelect={(_, e) => setReservationData((state) => ({
                    ...state,
                    lawyer_id: e.currentTarget.dataset.lawyerid,
                  }))}
                >
                  <Dropdown.Toggle variant="secondary">
                    Select lawyer
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomDropMenu}>
                    {lawyers?.map((lawyer, index) => (
                      <Dropdown.Item eventKey={index + 1} data-lawyerid={lawyer.id} key={lawyer.id} id={lawyer.name} className="d-flex gap-2 align-items-center">
                        <img src={lawyer.avatar_url} alt={lawyer.name} className="lawyer-thumbnail" />
                        <p className="m-0 text-truncate">{`${lawyer.name} | $${lawyer.rates}/hr`}</p>
                      </Dropdown.Item>
                    ))}
                    {lawyersState.status === 'fetching'
                      && (
                        <Dropdown.Item eventKey="1" className="text-center" disabled>
                          <Spinner animation="border" variant="primary" role="status" className="my-auto">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </Dropdown.Item>
                      )}
                    {!lawyers?.length
                      && (
                        <Dropdown.Item eventKey="1" className="text-center" disabled>
                          There are no listed lawyers.
                        </Dropdown.Item>
                      )}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            <Form.Control.Feedback type="invalid" className={validateInput('lawyer') ? 'd-block' : ''}>{renderError('lawyer')}</Form.Control.Feedback>
          </div>
          <div className="mb-2">
            <div className="d-flex gap-2 flex-wrap">
              <DatePicker
                selected={reservationData.reservationdate}
                onChange={(date) => setReservationData((state) => ({
                  ...state,
                  reservationdate: date.getHours() < 8 ? new Date(date.setHours(9)) : date,
                }))}
                customInput={<CustomInput />}
                minDate={new Date()}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Appointment date"
                timeIntervals={60}
                minTime={new Date().setHours(8)}
                maxTime={new Date().setHours(17)}
                wrapperClassName="flex-grow-1"
              />
              <InputGroup className="flex-grow-1" style={{ width: '150px' }}>
                <Form.Select
                  value={reservationData.duration}
                  onChange={(e) => setReservationData((state) => ({
                    ...state,
                    duration: e.target.value,
                  }))}
                  isInvalid={validateInput('duration')}
                >
                  <option value="">Duration</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
                <InputGroup.Text>Hours</InputGroup.Text>
              </InputGroup>
            </div>
            <div className="d-flex flex-column flex-sm-row">
              <Form.Control.Feedback type="invalid" className={validateInput('reservationdate') ? 'd-block' : ''}>{renderError('reservationdate')}</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" className={validateInput('duration') ? 'd-block' : ''}>{renderError('duration')}</Form.Control.Feedback>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <InputGroup className="w-auto flex-grow-1">
              <InputGroup.Text>Total:</InputGroup.Text>
              <Form.Control
                value={totalOutputHandler()}
                readOnly
                placeholder="N/A"
              />
            </InputGroup>
            <Button className="px-4 text-light fw-bold" onClick={formHandler}>
              Book Now
            </Button>
          </div>
          {reservationState.status === 'fetching'
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

export default Reserve;
