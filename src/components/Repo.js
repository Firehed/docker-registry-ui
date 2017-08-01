// @flow
import React, { Component } from 'react';
import Link from './Link';

type Props = {
  name: string,
  tags: string[],
};

class Repo extends Component<void, Props, void> {

  renderTag = (tag: string) => {
    return <li key={tag}><Link to={"/ui/" + this.props.name + "/tag/" + tag}>{tag}</Link></li>
  }

  render() {
    return <ul>{this.props.tags.map(this.renderTag)}</ul>
  }
}

export default Repo;
