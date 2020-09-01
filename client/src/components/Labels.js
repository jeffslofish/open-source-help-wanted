import React from 'react';
import * as chromatism from 'chromatism';
import PropTypes from 'prop-types';

const Labels = ({ labels }) => {
  return (
    <div className='issue-labels'>
      {labels.map((label, i) => {
        const style = {
          backgroundColor: '#' + label.color,
          color: chromatism.contrastRatio('#' + label.color).hex,
        };
        return (
          <span key={i} className='issue-label' style={style}>
            {label.name}
          </span>
        );
      })}
    </div>
  );
};

Labels.propTypes = {
  labels: PropTypes.array.isRequired,
};

export default Labels;
