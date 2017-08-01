// @flow
import React, { Component } from 'react';
import Layer from './Layer';

type Props = {
  domain: string,
  name: string,
  layer: string,
};
type State = {
  loading: bool,
  size: ?number,
};

export default class LayerContainer extends Component<void, Props, State> {
  state = {
    loading: false,
    size: null,
  };

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }
  componentWillReceiveProps(next: Props) {
    this.fetchBlobInfo(next.layer)
  }

  fetchBlobInfo(layer: string) {
    this.setState({ loading: true });

    fetch('https://' + this.props.domain + '/v2/' + this.props.name + '/blobs/' + layer, {
      method: 'HEAD',
      credentials: 'include',
    })
      .then(response => this.setState({
        loading: false,
        size: parseInt(response.headers.get('content-length'), 10) || 0,
      }))
  }

  render() {
    if (this.state.loading || !this.state.size) {
      return <span>Loading</span>
    }
    return <Layer blobSum={this.props.layer} size={this.state.size} />
  }
}
