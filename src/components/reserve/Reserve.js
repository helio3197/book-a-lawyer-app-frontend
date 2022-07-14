import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { IoClose } from 'react-icons/io5';
import CustomDropMenu from './CustomDropMenu';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';

const Reserve = () => {
  const [params] = useSearchParams();
  const selectedLawyer = params.get('lawyer');
  const lawyersState = useSelector((state) => state.lawyers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { lawyers } = lawyersState;
  const mediaQuerySm = window.matchMedia('(min-width: 600px)');
  const [dropdownPosition, setDropdownPosition] = useState(mediaQuerySm.matches ? 'end' : 'down');
  const initialReservationData = {
    lawyer_id: selectedLawyer,
  };
  const [reservationData, setReservationData] = useState(initialReservationData);

  console.log(reservationData);

  useEffect(() => {
    if (lawyersState.status === 'failed') {
      navigate(`${location.pathname}${location.search}`, { status: { notice: `Something went wrong: ${lawyersState.error}` } });
    }
  }, [lawyersState.status]);

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
    };
  }, []);

  const removeSelectedLawyer = (id) => {
    const lawyerToRemove = lawyers.find((lawyer) => lawyer.id === +id);
    const clickHandler = () => setReservationData((state) => ({ ...state, lawyer_id: null }));

    return (
      <Button type="button" variant="secondary" className="d-flex align-items-center gap-2" onClick={clickHandler}>
        <img src={lawyerToRemove.avatar_url} alt={lawyerToRemove.name} style={{ width: '40px', height: '40px' }} className="lawyer-thumbnail" />
        <p className="m-0 text-truncate">{lawyerToRemove.name}</p>
        <IoClose className="text-light fs-4" />
      </Button>
    );
  };

  return (
    <Container fluid className="h-100 reserve-bg d-flex">
      <Container fluid="sm" className="py-3 border rounded form-width-sm shadow my-auto bg-light">
        <Form className="reserve-form">
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
                <Dropdown.Toggle>
                  Select lawyer
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomDropMenu}>
                  {lawyers?.map((lawyer, index) => (
                    <Dropdown.Item eventKey={index + 1} data-lawyerid={lawyer.id} key={lawyer.id} id={lawyer.name} className="d-flex gap-2 align-items-center">
                      <img src={lawyer.avatar_url} alt={lawyer.name} className="lawyer-thumbnail" />
                      <p className="m-0 text-truncate">{lawyer.name}</p>
                    </Dropdown.Item>
                  ))}
                  {lawyersState.status === 'fetching'
                    && (
                      <Dropdown.Item eventKey="1" className="text-center">
                        <Spinner animation="border" variant="primary" role="status" className="my-auto">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </Dropdown.Item>
                    )}
                </Dropdown.Menu>
              </Dropdown>
            )}
        </Form>
      </Container>
    </Container>
  );
};

export default Reserve;