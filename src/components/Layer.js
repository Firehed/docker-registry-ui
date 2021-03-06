// @flow
import React, { Component } from 'react';

// Local cheat so Intl is recognized
// See https://github.com/facebook/flow/issues/2801#issuecomment-305002446
declare class Intl$NumberFormat {
  constructor(locales: string | Array<string>, options?: Object): void;
  format(number: number): string;
}
declare type IntlType = {
  NumberFormat: Class<Intl$NumberFormat>,
}
declare var Intl: IntlType

const suffixes = ['b', 'k', 'M', 'G']

type Props = {
  blobSum: string,
  size: number,
}
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
    const prefix = 'sha256:'
    const hashLength = 12
    const shortHash = this.props.blobSum.slice(prefix.length).slice(0, hashLength)

    return (
      <div>{shortHash}: {this.sizeString(this.props.size)}</div>
    );
  }
}
