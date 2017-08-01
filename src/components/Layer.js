// @flow
import React, { Component } from 'react';

type Props = {
  blobSum: string,
  size: number,
};

const suffixes = ['b', 'k', 'M', 'G']

// Local cheat so Intl is recognized
// See https://github.com/facebook/flow/issues/2801#issuecomment-305002446
declare class Intl$NumberFormat {
  constructor(locales: string | Array<string>, options?: Object): void;
  format(number: number): string;
}
declare type IntlType = {
  NumberFormat: Class<Intl$NumberFormat>,
}
declare var Intl: IntlType;


export default class Layer extends Component<void, Props, void> {


  sizeString(size: number) {
    let suffixIndex = 0
    while (size > 1024) {
      suffixIndex++
      size = size / 1024
    }

    let format = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      style: 'decimal',
    })

    return format.format(size) + suffixes[suffixIndex]
  }

  render() {
    return (
      <div>{this.props.blobSum}: {this.sizeString(this.props.size)}</div>
    );
  }
}
