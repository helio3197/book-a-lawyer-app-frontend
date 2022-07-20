import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const lawyersState = useSelector((state) => state.lawyers);

  useEffect(() => {
    if (lawyersState.status !== 'completed') {
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
    <Container fluid="sm" as="section" className="py-3 px-xl-5 my-auto d-flex flex-column flex-xl-row text-center detail-section">
      <div className="top-details p-3">
        <img src={lawyer.avatar_url} alt="Profle" className="profile-pic" />
        <p className="m-0 mt-3">
          { lawyer.bio }
        </p>
      </div>
      <div className="bottom-details d-flex flex-column">
        <h2 className="text-center">{lawyer.name}</h2>
        <ul className="lawyer-items m-0 p-0">
          <div className="inner-listing">
            <li><strong>Phone No:</strong></li>
            <li className="inner-listing2">
              { lawyer.phone }
            </li>
          </div>
          <div className="inner-listing">
            <li><strong>Location:</strong></li>
            <li className="inner-listing2">
              { lawyer.location }
            </li>
          </div>
          <div className="inner-listing">
            <li><strong>Charges:</strong></li>
            <li className="inner-listing2">
              $
              { lawyer.rates }
              /hr
            </li>
          </div>
          <div className="inner-listing">
            <li><strong>Email:</strong></li>
            <li className="inner-listing2">
              { lawyer.email }
            </li>
          </div>
        </ul>
        <Link to={mylink} variant="primary" className="text-white w-auto fw-bold btn btn-primary btn-lg">Reserve appointment</Link>
      </div>
    </Container>
  );

  // return (
  //   <section className="detail-section">
  //     <div className="top-details">
  //       <img src={lawyer.avatar_url} alt="Profle" className="profile-pic" />
  //       <p className="bio-head">Biography</p>
  //       <p className="bio">
  //         { lawyer.bio }
  //       </p>
  //     </div>
  //     <div className="bottom-details">
  //       <ul className="lawyer-items">
  //         <div className="inner-listing">
  //           <li><strong>Name:</strong></li>
  //           <li className="inner-listing2">
  //             {' '}
  //             { lawyer.name }
  //           </li>
  //         </div>
  //         <div className="inner-listing">
  //           <li><strong>Phone No:</strong></li>
  //           <li className="inner-listing2">
  //             {' '}
  //             { lawyer.phone }
  //           </li>
  //         </div>
  //         <div className="inner-listing">
  //           <li><strong>Location:</strong></li>
  //           <li className="inner-listing2">
  //             {' '}
  //             { lawyer.location }
  //           </li>
  //         </div>
  //         <div className="inner-listing">
  //           <li><strong>Charges:</strong></li>
  //           <li className="inner-listing2">
  //             {' '}
  //             $
  //             { lawyer.rates }
  //             /hr
  //           </li>
  //         </div>
  //         <div className="inner-listing">
  //           <li><strong>Email:</strong></li>
  //           <li className="inner-listing2">
  //             { lawyer.email }
  //             {' '}
  //           </li>
  //         </div>
  //       </ul>
  //       <Button href={mylink} variant="primary" size="lg" className="resrvebtn">Reserve</Button>
  //     </div>
  //   </section>
  // );
};

export default Detail;
