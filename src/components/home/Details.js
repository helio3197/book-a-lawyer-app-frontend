import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Logo from '../../assets/images/profile-pic.png';
import { getLawyers } from '../../redux/lawyers/lawyersIndex';

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const lawyersState = useSelector((state) => state.lawyers);

  useEffect(() => {
    dispatch(getLawyers());
  }, []);

  const lawyer = lawyersState.lawyers.filter((lawyer) => lawyer.id === +(params.id));

  console.log(lawyer);
  // const displayMagic = () => {
  //   console.log(lawyersState.lawyers);
  //   console.log(params);
  //   const lawyer = lawyersState.lawyers.filter((lawyer) => lawyer.id === +(params.id));

  //   console.log(lawyer[0].name);
  // };

  return (
    <>
      <section className="detail-section">
        <div className="top-details">
          <img src={Logo} alt="Profle" className="profile-pic" />
          <ul className="lawyer-items">
            <div className="inner-listing">
              <li><strong>Name:</strong></li>
              <li className="inner-listing2">
                {' '}
                { lawyer[0].name }
              </li>
            </div>
            <div className="inner-listing">
              <li><strong>Phone No:</strong></li>
              <li className="inner-listing2">
                {' '}
                { lawyer[0].phone }
              </li>
            </div>
            <div className="inner-listing">
              <li><strong>Location:</strong></li>
              <li className="inner-listing2">
                {' '}
                { lawyer[0].location }
              </li>
            </div>
            <div className="inner-listing">
              <li><strong>Charges:</strong></li>
              <li className="inner-listing2">
                {' '}
                $
                { lawyer[0].rate }
                /hr
              </li>
            </div>
          </ul>
        </div>
        <div className="bottom-details">
          <p className="bio-head">Biography</p>
          <p className="bio">
            { lawyer[0].bio }
          </p>
          <Button href="/reserve" variant="success" size="lg">Reserve</Button>
          {/* <button type="button" onClick={displayMagic}>click</button> */}
        </div>
      </section>
    </>
  );
};

export default Detail;
