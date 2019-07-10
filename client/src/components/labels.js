import React from 'react';
import * as chromatism from 'chromatism';
import PropTypes from 'prop-types';

function Labels(props) {
  const labels = props.labels.map((label, i) => {
    const style = {
      backgroundColor: '#' + label.color,
      color: chromatism.contrastRatio("#" + label.color).hex
    };
    return <span key={i} className="label" style={style}>{label.name}</span>
  });

  return <div>{labels}</div>;
}

Labels.propTypes = {
  labels: PropTypes.array.isRequired
};

export default Labels;
