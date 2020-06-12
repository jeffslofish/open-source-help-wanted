import React from 'react';
import PropTypes from 'prop-types';

const InputElement = ({ label, placeholder, text, setText }) => {
  const onChange = (e) => setText(e.target.value);

  return (
    <div className="input-component">
      <label className="label-name">{label}</label>
      <input
        className="input-element"
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={onChange}
      />
    </div>
  );
};

InputElement.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
};

export default InputElement;
