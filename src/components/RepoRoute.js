// @flow
import React, { Component } from 'react';
import Repo from './Repo';
import type { ContextRouter } from 'react-router';

type Props = {
  repo: string,
  name: string,
  domain: string,
  user: string,
  password: string,
} & ContextRouter;
export default class RepoRoute extends Component<void, Props, void> {
  render() {
    return (
      <Repo
      repo={this.props.repo}
      name={this.props.name}
      domain={this.props.domain}
      user={this.props.user}
      password={this.props.password}
      />
    );
  }
};
