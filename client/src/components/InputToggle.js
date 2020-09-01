import React from 'react';
import PropTypes from 'prop-types';

const InputToggle = ({ leftLabel, rightLabel, reference }) => {
  return (
    <div className='input-element'>
      <label>{leftLabel}</label>
      <input type='checkbox' ref={reference} />
      <label>{rightLabel}</label>
    </div>
  );
};

InputToggle.propTypes = {
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired,
  reference: PropTypes.object.isRequired,
};

export default InputToggle;
