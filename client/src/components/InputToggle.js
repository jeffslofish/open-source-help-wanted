import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-toggle-switch';

function InputToggle(props) {
  return (
    <div className="input-element">
      <label>{props.leftLabel}</label>
      <Switch on={props.value} onClick={props.clickHandler} />
      <label>{props.rightLabel}</label>
    </div>
  );
}

InputToggle.propTypes = {
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default InputToggle;

