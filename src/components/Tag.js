// @flow
import React, { Component } from 'react';
import LayerContainer from './LayerContainer';

type Props = {
  domain: string,
  layers: string[],
  name: string,
};
export default class Tag extends Component<void, Props, void> {
  renderLayer = (layer: string) => {
    return <li key={layer}><LayerContainer layer={layer} domain={this.props.domain} name={this.props.name} /></li>

  }

  render() {
    return <ul>{this.props.layers.sort().map(this.renderLayer)}</ul>
  }
}
