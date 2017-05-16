import React, { Component } from 'react';

class Labels extends Component {
  render() {
    let labels = [];

    let propsLabels = this.props.labels;

    for (let i = 0; i < propsLabels.length; i++) {
      let label = propsLabels[i];
      let style = {backgroundColor: '#' + label.color};
      labels.push(<span key={i} className="label" style={style}>{label.name}</span>);
    }
    return (
      <div>{labels}</div>
    )
  }
}


export default Labels;
