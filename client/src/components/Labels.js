import React from 'react';
import * as chromatism from 'chromatism';
import PropTypes from 'prop-types';

function Labels(props) {
  const labels = props.labels.nodes.map((label) => {
    const style = {
      backgroundColor: '#' + label.color,
      color: chromatism.contrastRatio("#" + label.color).hex
    };
    return <span key={label.id} className="label" style={style}>{label.name}</span>
  });

  return <div>{labels}</div>;
}

Labels.propTypes = {
  edge: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })
};

export default Labels;
