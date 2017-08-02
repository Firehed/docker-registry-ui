// @flow
import React, { Component } from 'react'
import RepoList from './RepoList'

type Props = {
  domain: string,
};
type State = {
  repositories: string[],
};

export default class RepoListContainer extends Component<void, Props, State> {
  
  state = {
    repositories: [],
  };

  componentDidMount() {
    this.fetchRepos(this.props)
  }

  componentWillReceiveProps(next: Props) {
    if (next.domain !== this.props.domain) {
      this.fetchRepos(next);
    }
  }

  fetchRepos(props: Props) {
    fetch('https://' + props.domain + '/v2/_catalog', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => this.setState({ repositories: json.repositories }))
  }

  render() {
    return <RepoList repos={this.state.repositories} />
  }
}
