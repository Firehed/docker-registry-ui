// @flow
import React, { Component } from 'react';
import Repo from './Repo';

type Props = {
  domain: string,
  name: string,
};

type State = {
  loading: bool,
  tags: string[],
};
class RepoContainer extends Component<void, Props, State> {
  state = {
    loading: false,
    tags: [],
  };

  componentDidMount() {
    this.fetchTags(this.props)
  }
  componentWillReceiveProps(next: Props) {
    if (next.domain !== this.props.domain
      || next.name !== this.props.name) {
      // TODO maybe have a way to force refreshing
      this.fetchTags(next)
    }
  }

  fetchTags(props: Props) {
    this.setState({ loading: true, tags: [] });
    fetch('https://' + props.domain + '/v2/' + props.name + '/tags/list', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => this.setState({
        loading: false,
        tags: json.tags,
      }))
  }

  render() {
    if (this.state.loading) {
      return (<span>Loading...</span>);
    }
    return <Repo name={this.props.name} tags={this.state.tags} />
  }
}

export default RepoContainer;
