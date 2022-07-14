import React, { useEffect } from 'react';
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
  console.log(selectedLawyer);

  useEffect(() => {
    if (lawyersState.status !== 'completed') {
      dispatch(getLawyers());
    }
  }, []);

  return (
    <Container fluid className="h-100 reserve-bg d-flex">
      <Container fluid="sm" className="py-3 border rounded form-width-sm shadow my-auto bg-light">
        <Form>
          <Dropdown drop="end">
            <Dropdown.Toggle>
              Select lawyer
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomDropMenu}>
              {lawyers?.map((lawyer, index) => (
                <Dropdown.Item eventKey={index + 1} key={lawyer.id} id={lawyer.name}>
                  {lawyer.name}
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
