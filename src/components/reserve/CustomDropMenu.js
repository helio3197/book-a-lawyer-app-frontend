import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const CustomMenu = ({
  children, style, className, 'aria-labelledby': labeledBy,
}, ref) => {
  const [value, setValue] = useState('');

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labeledBy}
    >
      <Form.Control
        autoFocus
        className="mx-3 my-2 w-auto"
        placeholder="Type to filter..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ul className="list-unstyled">
        {React.Children.toArray(children).filter(
          (child) => !value || child.props.children.toLowerCase().startsWith(value.toLowerCase()),
        )}
      </ul>
    </div>
  );
};

CustomMenu.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  'aria-labelledby': PropTypes.string,
};

CustomMenu.defaultProps = {
  style: {},
  className: null,
  'aria-labelledby': null,
};

export default React.forwardRef(CustomMenu);
