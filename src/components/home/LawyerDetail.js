import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// import Logo from '../../assets/images/profile-pic.png';
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

  const lawyer = lawyersState.lawyers.filter((lawyer) => lawyer.id === +(params.id))[0];

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
        </ul>
        <Button href="/reserve" variant="success" size="lg" className="resrvebtn">Reserve</Button>
      </div>
    </section>
  );
};

export default Detail;
