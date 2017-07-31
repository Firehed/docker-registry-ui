// @flow
import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import RepoList from './components/RepoList';
import Repo from './components/Repo';
//import RepoRoute from './components/RepoRoute';

import type { ContextRouter } from 'react-router';

import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom';

// https://building.coursera.org/blog/2017/06/01/best-practices-for-flow-typing-react-components/

type Props = {
  domain: string,
  user: string,
  password: string,
};
type State = {
  repositories: string[],
};

class App extends Component {

  state = {
    repositories: [],
  };

  constructor(props: Props) {
    super(props);

    this.fetchRepos();
  }

  fetchRepos() {
    let domain = this.props.domain;

    let auth = btoa(this.props.user + ':' + this.props.password)
    fetch('https://' + domain + '/v2/_catalog', {
      credentials: 'include',
//      headers: {
//        'Authorization': 'Basic ' + auth,
//      },
    })
      .then(response => response.json())
      .then(json => this.setState({ repositories: json.repositories }))
  }

  render() {
    return (
      <Router>
      <div className="App">
        <RepoList repos={this.state.repositories} />
        <Route path="/" render={() => (<Redirect to="/ui" />)} />
        <Route
          path="/ui/:repo/:name"
          render={(props: ContextRouter) => (
            <Repo
              name={props.match.params.repo+'/'+props.match.params.name}
              {...this.props}
             />
          )}
        />
        <Route
          path="/ui/:repo/:name/tag/:tag"
          render={(props: ContextRouter) => (
            <Repo
              name={props.match.params.repo+'/'+props.match.params.name}
              tag={props.match.params.tag}
              {...this.props}
             />
          )}
        />
      </div>
      </Router>
    );
  }
}
// <Repo name="oauth/fpm" {...this.props} />
//     <img src={logo} className="App-logo" alt="logo" />

export default App;
