import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomDropMenu from './CustomDropMenu';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';

const Reserve = () => {
  const [params] = useSearchParams();
  const selectedLawyer = params.get('lawyer');
  const lawyersState = useSelector((state) => state.lawyers);
  const dispatch = useDispatch();
  const { lawyers } = lawyersState;
  const mediaQuerySm = window.matchMedia('(min-width: 600px)');
  const [dropdownPosition, setDropdownPosition] = useState(mediaQuerySm.matches ? 'end' : 'down');

  console.log(selectedLawyer);

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

  return (
    <Container fluid className="h-100 reserve-bg d-flex">
      <Container fluid="sm" className="py-3 border rounded form-width-sm shadow my-auto bg-light">
        <Form className="reserve-form">
          <Dropdown drop={dropdownPosition}>
            <Dropdown.Toggle>
              Select lawyer
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomDropMenu}>
              {lawyers?.map((lawyer, index) => (
                <Dropdown.Item eventKey={index + 1} key={lawyer.id} id={lawyer.name} className="d-flex gap-2 align-items-center">
                  <img src={lawyer.avatar_url} alt={lawyer.name} className="lawyer-thumbnail" />
                  <p className="m-0 text-truncate">{lawyer.name}</p>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Container>
    </Container>
  );
};

export default Reserve;
