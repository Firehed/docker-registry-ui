// @flow
import React, { Component } from 'react';
import LayerContainer from './LayerContainer';

type Props = {
  domain: string,
  layers: string[],
  name: string,
};
class Tag extends Component<void, Props, void> {
  renderLayer = (layer: string) => {
    return <li><LayerContainer key={layer} layer={layer} domain={this.props.domain} name={this.props.name} /></li>

  }

  render() {
    return <ul>{this.props.layers.map(this.renderLayer)}</ul>
  }
}

export default Tag;
