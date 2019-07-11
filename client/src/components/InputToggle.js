import React from 'react';
import PropTypes from 'prop-types';

function InputToggle(props) {
  return (
    <div className="input-element">
      <label>{props.leftLabel}</label>
      <input type="checkbox" ref={props.reference} />
      <label>{props.rightLabel}</label>
    </div>
  );
}

InputToggle.propTypes = {
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired,
  reference: PropTypes.object.isRequired
};

export default InputToggle;

