// @flow
import React, { Component } from 'react';

type Props = {
  children: any[],
  to: string,
};
export default class Link extends Component<void, Props, void> {

  onClick = (e: Event) => {
    e.preventDefault()
    window.history.pushState(null, "Title", this.props.to)
    window.onpopstate()
  }

  render() {
    return <a href={this.props.to} onClick={this.onClick}>{this.props.children}</a>
  }
}
