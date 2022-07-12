import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { BsCaretRight, BsCaretLeft } from 'react-icons/bs';
import LawyerCard from './LawyerCard';

const LawyersCarousel = ({ items }) => {
  const carouselContainer = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!carouselContainer.current) {
      return undefined;
    }
    const { element } = carouselContainer.current;
    const resizeObserver = new ResizeObserver(() => {
      setContainerWidth(element.clientWidth);
    });
    resizeObserver.observe(element);
    return () => {
      resizeObserver.unobserve(element);
    };
  }, []);

  const c = Math.floor(containerWidth / 285);
  const cardsPerItem = c >= 1 ? c : 1;
  const numberOfItems = Math.ceil(items.length / cardsPerItem);

  const renderCarouselItems = (cardsInItems, itemsAmount) => {
    const carouselItems = [];
    let k = 0;
    for (let i = 0; i < itemsAmount; i += 1) {
      const cards = [];
      let j = 0;
      while (items[k] && j < cardsInItems) {
        cards.push((
          <LawyerCard
            name={items[k].name}
            avatarUrl={items[k].avatar_url}
            location={items[k].location}
            rates={items[k].rates}
            id={items[k].id}
          />
        ));
        j += 1;
        k += 1;
      }
      carouselItems.push((
        <Carousel.Item>
          {cards}
        </Carousel.Item>
      ));
    }

    return carouselItems;
  };

  return (
    <Carousel
      variant="dark"
      ref={carouselContainer}
      nextIcon={(
        <span className="carousel-next-icon">
          <BsCaretRight />
        </span>
      )}
      prevIcon={(
        <span className="carousel-prev-icon">
          <BsCaretLeft />
        </span>
      )}
      className="lawyers-carousel"
    >
      {renderCarouselItems(cardsPerItem, numberOfItems)}
    </Carousel>
  );
};

LawyersCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.number,
    email: PropTypes.string,
    location: PropTypes.string,
    rates: PropTypes.number,
    bio: PropTypes.string,
    avatar_url: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
};

export default LawyersCarousel;
