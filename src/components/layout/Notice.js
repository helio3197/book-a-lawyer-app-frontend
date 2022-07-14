import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const Notice = ({ message }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    window.history.pushState({
      ...window.history.state,
      usr: { ...window.history.state.usr, notice: null },
    }, 'Remove notice');
  }, []);

  return (
    <Alert show={show} onClose={() => setShow(false)} variant="primary" dismissible className="notice m-0">
      <p className="m-0">{message}</p>
    </Alert>
  );
};

Notice.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notice;
