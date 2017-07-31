// @flow
import React, { Component } from 'react';

type LayerProp = {
  domain: string,
  user: string,
  password: string,
  name: string,
  blobSum: string,
};
type LayerState = {
  loading: bool,
  size: number,
};
class Layer extends Component<void, LayerProp, LayerState> {
  state = {
    loading: false,
    size: 0,
  };

  componentWillReceiveProps() {
    console.log('cwp');
    this.fetchBlobInfo(this.props.blobSum)
  }

  fetchBlobInfo(layer: string) {
    this.setState({ loading: true });

    let domain = this.props.domain;

    let auth = btoa(this.props.user + ':' + this.props.password)
    fetch('https://' + domain + '/v2/' + this.props.name + '/blobs/' + layer, {
      method: 'HEAD',
      headers: {
        'Authorization': 'Basic ' + auth,
      },
    })
      .then(response => this.setState({
        loading: false,
        size: response.headers.get('content-length') || 0,
      }))
  }

  render() {
    if (this.state.loading) {
      return (<span>Loading...</span>);
    }
    return (
      <div>{this.props.blobSum}: {this.state.size}</div>
    );
  }
}

export default Layer;
