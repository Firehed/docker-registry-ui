// @flow
import React, { Component } from 'react';

import Link from './components/Link';

import RepoContainer from './components/RepoContainer';
import RepoListContainer from './components/RepoListContainer';
import TagContainer from './components/TagContainer';

// https://building.coursera.org/blog/2017/06/01/best-practices-for-flow-typing-react-components/

type Props = {
  domain: string,
};
type State = {
  repo: ?string,
  tag: ?string,
};

export default class App extends Component<void, Props, State> {

  state = {
    repo: null,
    tag: null,
  };

  constructor(props: Props) {
    super(props);

    window.onpopstate = () => this.route(window.location.pathname)
  }

  componentWillReceiveProps() {
    this.route(window.location.pathname)
  }
  componentDidMount() {
    this.route(window.location.pathname)
  }

  route(pathName: string) {
    // Cheat: redirect / to /ui/ (nginx should avoid this coming up)
    if (pathName === '/') {
      window.history.pushState(null, "Title", '/ui/')
    }
    const prefix = '/ui/'
    const components = pathName.slice(prefix.length).split('/')

    let repo, tag
    switch (components.length) {
      case 2:
        repo = components[0] + '/' + components[1]
        break
      case 4:
        if (components[2] !== 'tag') {
          console.error('Invalid route: %s', pathName);
        }
        repo = components[0] + '/' + components[1]
        tag = components[3]
        break
      default:
        console.log(components)
        console.log(components.length)
        break
    }

    this.setState({
      repo: repo,
      tag: tag,
    })
  }

  render() {
    let repo = null
    let tag = null
    if (this.state.repo) {
      repo = <RepoContainer domain={this.props.domain} name={this.state.repo} />
      if (this.state.tag) {
        tag = <TagContainer domain={this.props.domain} name={this.state.repo} tag={this.state.tag} />
      }
    }

    return (
      <div className="App">
        <Link to="/">Home</Link>
        <RepoListContainer domain={this.props.domain} />
        {repo}
        {tag}
      </div>
    );
  }
}
