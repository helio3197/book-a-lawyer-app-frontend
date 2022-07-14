import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Notice = ({ message }) => {
  useEffect(() => {
    window.history.pushState({
      ...window.history.state,
      usr: { ...window.history.state.usr, notice: null },
    }, 'Remove notice');
  }, []);

  return (
    <div className="position-absolute text-light bg-secondary" style={{ top: '60px', left: '25px', right: '25px' }}>
      {message}
    </div>
  );
};

Notice.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notice;
