// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  repos: string[],
};

class RepoList extends Component<void, Props, void> {
  render() {
    let repoList = this.props.repos
      .map(repo => <li key={repo}><Link to={"/ui/"+repo}>{repo}</Link></li>);
    return (
      <ul>{repoList}</ul>
    );
  }
}

export default RepoList;
