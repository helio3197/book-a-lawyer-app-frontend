import React from 'react';
import Button from 'react-bootstrap/Button';
import Logo from '../../assets/images/profile-pic.png';

const Detail = () => (

  <>
    <section className="detail-section">
      <div className="top-details">
        <img src={Logo} alt="Profle" className="profile-pic" />
        <ul className="lawyer-items">
          <div className="inner-listing">
            <li><strong>Name:</strong></li>
            <li className="inner-listing2"> Richard Opiyo</li>
          </div>
          <div className="inner-listing">
            <li><strong>Phone No:</strong></li>
            <li className="inner-listing2"> 0790837592</li>
          </div>
          <div className="inner-listing">
            <li><strong>Location:</strong></li>
            <li className="inner-listing2"> Nairobi, Kenya</li>
          </div>
          <div className="inner-listing">
            <li><strong>Charges:</strong></li>
            <li className="inner-listing2"> $45/hr</li>
          </div>
        </ul>
      </div>
      <div className="bottom-details">
        <p className="bio-head">Biography</p>
        <p className="bio">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book.
          It has survived not only five centuries, but also the leap into electronic
          {' '}
        </p>
        <Button href="/reserve" variant="success" size="lg">Reserve</Button>
      </div>
    </section>
  </>

);

export default Detail;
