import React from 'react';
import Button from 'react-bootstrap/Button';
import Logo from '../../assets/images/profile-pic.png';

const Detail = () => (

  <>
    <section className="detail-section">
      <div className="top-details">
        <img src={Logo} alt="Profle" className="profile-pic" />
        <p className="profile-name">
          <strong>Name:</strong>
          {' '}
          Richard Opiyo
        </p>
        <p className="bio">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book.
          It has survived not only five centuries, but also the leap into electronic
          {' '}
        </p>
      </div>
      <div className="bottom-details">
        <ul className="lawyer-items">
          <li>
            <strong>Phone Number:</strong>
            {' '}
            0790837592
          </li>
          <li>
            <strong>Location:</strong>
            {' '}
            Nairobi, Kenya
          </li>
          <li>
            <strong>Charges:</strong>
            {' '}
            $45/hr
          </li>
        </ul>
        <Button href="/reserve" variant="success" size="lg">Reserve</Button>
      </div>
    </section>
  </>

);

export default Detail;
