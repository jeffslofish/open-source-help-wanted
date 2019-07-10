import React from 'react';
import PropTypes from 'prop-types';

const InputElement = props => {
  return (
    <div className="input-component">
      <label className="label-name">{props.label}</label>
      <input className="input-element" type="text"
        placeholder={props.placeholder} value={props.value} onChange={props.changeHandler} />
    </div>
  );
}

InputElement.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default InputElement;