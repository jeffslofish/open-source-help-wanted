import React from 'react';
import PropTypes from 'prop-types';

const InputElement = ({ label, placeholder, reference }) => {
  return (
    <div className='input-component'>
      <label className='label-name'>{label}</label>
      <input
        className='input-element'
        type='text'
        placeholder={placeholder}
        ref={reference}
      />
    </div>
  );
};

InputElement.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  reference: PropTypes.any.isRequired
};

export default InputElement;
