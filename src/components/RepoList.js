// @flow
import React, { Component } from 'react';
import Link from './Link';

type Props = {
  repos: string[],
};

export default class RepoList extends Component<void, Props, void> {
  renderRepo = (repo: string) => {
    return <li key={repo}><Link to={"/ui/"+repo}>{repo}</Link></li>
  }
  render() {
    return (
      <ul>{this.props.repos.map(this.renderRepo)}</ul>
    );
  }
}
