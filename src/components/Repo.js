// @flow
import React, { Component } from 'react';
import Layer from './Layer';
import Taglist from './Taglist';

type Props = {
  domain: string,
  user: string,
  password: string,
  name: string,
  tag?: string,
};

type State = {
  layers: string[],
  loading: bool,
  tags: string[],
};

class Repo extends Component<void, Props, State> {
  state = {
    layers: [],
    loading: false,
    tags: [],
  };

  constructor(props: Props) {
    super(props)
    this.componentWillReceiveProps()
  }
  componentWillReceiveProps() {
    this.fetchTags()
  //  this.fetchManifests('latest');
  }

  unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  fetchTags() {
    let domain = this.props.domain;
    this.setState({ loading: true });
    fetch('https://' + domain + '/v2/' + this.props.name + '/tags/list', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => this.setState({
        loading: false,
        tags: json.tags,
      }))
  }

  fetchManifests(tag: string) {
    let domain = this.props.domain;
    this.setState({ loading: true });

    let auth = btoa(this.props.user + ':' + this.props.password)
    fetch('https://' + domain + '/v2/' + this.props.name + '/manifests/' + tag, {
      credentials: 'include',
//      headers: {
//        'Authorization': 'Basic ' + auth,
//      },
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
    return (<Taglist tags={this.state.tags} />)
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
