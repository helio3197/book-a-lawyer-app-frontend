import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomDropMenu from './CustomDropMenu';

const Reserve = () => {
  const [params] = useSearchParams();
  const selectedLawyer = params.get('lawyer');
  console.log(selectedLawyer);

  return (
    <Container fluid className="h-100 reserve-bg d-flex">
      <Container fluid="sm" className="py-3 border rounded form-width-sm shadow my-auto bg-light">
        <Form>
          <Dropdown drop="end">
            <Dropdown.Toggle>
              Select lawyer
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomDropMenu}>
              <Dropdown.Item eventKey="1">Red</Dropdown.Item>
              <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Container>
    </Container>
  );
};

export default Reserve;
