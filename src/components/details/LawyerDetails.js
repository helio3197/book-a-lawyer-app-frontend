import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const lawyersState = useSelector((state) => state.lawyers);

  useEffect(() => {
    if (lawyersState.statusLawyers !== 'completed') {
      dispatch(getLawyers());
    }
  }, []);

  if (lawyersState.status === 'idle' || lawyersState.status === 'fetching') {
    return (
      <Container as="section" fluid className="py-2 lawyers align-items-center">
        <Spinner animation="border" variant="primary" role="status" className="my-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (lawyersState.status === 'failed') {
    return (
      <Container as="section" fluid className="py-2 lawyers">
        <h2 className="mt-2">{`Something went wrong: ${lawyersState.error}`}</h2>
      </Container>
    );
  }

  const lawyer = lawyersState.lawyers.filter((lawyer) => lawyer.id === +(params.id))[0];
  const mylink = `/reserve?lawyer=${lawyer.id}`;

  return (
    <section className="detail-section">
      <div className="top-details">
        <img src={lawyer.avatar_url} alt="Profle" className="profile-pic" />
        <p className="bio-head">Biography</p>
        <p className="bio">
          { lawyer.bio }
        </p>
      </div>
      <div className="bottom-details">
        <ul className="lawyer-items">
          <div className="inner-listing">
            <li><strong>Name:</strong></li>
            <li className="inner-listing2">
              {' '}
              { lawyer.name }
            </li>
          </div>
          <div className="inner-listing">
            <li><strong>Phone No:</strong></li>
            <li className="inner-listing2">
              {' '}
              { lawyer.phone }
            </li>
          </div>
          <div className="inner-listing">
            <li><strong>Location:</strong></li>
            <li className="inner-listing2">
              {' '}
              { lawyer.location }
            </li>
          </div>
          <div className="inner-listing">
            <li><strong>Charges:</strong></li>
            <li className="inner-listing2">
              {' '}
              $
              { lawyer.rates }
              /hr
            </li>
          </div>
          <div className="inner-listing">
            <li><strong>Email:</strong></li>
            <li className="inner-listing2">
              { lawyer.email }
              {' '}
            </li>
          </div>
        </ul>
        <Button href={mylink} variant="primary" size="lg" className="resrvebtn">Reserve</Button>
      </div>
    </section>
  );
};

export default Detail;
