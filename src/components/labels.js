import React from 'react';
import * as chromatism from 'chromatism';

function Labels(props) {
  let labels = [];

  let propsLabels = props.labels;

  for (let i = 0; i < propsLabels.length; i++) {
    let label = propsLabels[i];
    let style = {
      backgroundColor: '#' + label.color,
      color: chromatism.contrastRatio("#" + label.color).hex
    };
    labels.push(<span key={i} className="label" style={style}>{label.name}</span>);
  }
  return (
    <div>{labels}</div>
  )
}

export default Labels;
