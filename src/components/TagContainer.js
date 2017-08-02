// @flow
import React, { Component } from 'react';
import Tag from './Tag';

type Props = {
  domain: string,
  name: string,
  tag: string,
}

type State = {
  loading: bool,
  layers: string[],
}

export default class TagContainer extends Component<void, Props, State> {
  state = {
    loading: false,
    layers: [],
  };

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }
  componentWillReceiveProps(next: Props) {
    this.fetchLayers(next.tag)
  }

  unique(value: string, index: number, self: Array<string>) {
    return self.indexOf(value) === index
  }

  fetchLayers(tag: string) {
    let domain = this.props.domain;
    this.setState({ loading: true });

    fetch('https://' + domain + '/v2/' + this.props.name + '/manifests/' + tag, {
      credentials: 'include',
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
    return <Tag layers={this.state.layers} name={this.props.name} domain={this.props.domain} />
  }
}
