// @flow
import React, { Component } from 'react';
import Layer from './Layer';

type Props = {
  domain: string,
  user: string,
  password: string,
  name: string,
};

type State = {
  layers: string[],
  loading: bool,
};

class Repo extends Component<void, Props, State> {
  state = {
    layers: [],
    loading: false,
  };

  componentWillReceiveProps() {
    this.fetchManifests('latest');
  }

  unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  fetchManifests(tag: string) {
    let domain = this.props.domain;
    this.setState({ loading: true });

    let auth = btoa(this.props.user + ':' + this.props.password)
    fetch('https://' + domain + '/v2/' + this.props.name + '/manifests/' + tag, {
      headers: {
        'Authorization': 'Basic ' + auth,
      },
    })
      .then(response => response.json())
      .then(json => json.fsLayers.map(layer => layer.blobSum))
      .then(blobSums => blobSums.filter(this.unique))
      .then(blobSums => this.setState({ layers: blobSums, loading: false }))
  }

  render() {
    if (this.state.loading) {
      return (<span>Loading...</span>);
    }
    let layers = this
      .state
      .layers
      .map(layer => <Layer key={layer} blobSum={layer} {...this.props} />)
    return (
      <ul>{layers}</ul>
    );
  }
}

export default Repo;
