// @flow
import React, { Component } from 'react';
import Layer from './Layer';
import { Link, Route } from 'react-router-dom';

type Props = {
  tags: string[],
};

class Taglist extends Component<void, Props, void> {
  render() {
    let tags = this
      .props
      .tags
      .map(tag => {console.log(tag); return (
          <li>
            <Link to={window.location.pathname + "/tag/" + tag}>{tag}</Link>
          </li>
        )
      })
    return (
      <div>
        <ul>
          {tags}
        </ul>
        <Route path={window.location.pathname + "/tag/:tag"} render={() => (<div>I'm a sub tag</div>)} />
      </div>
    )
  }
}

export default Taglist;
