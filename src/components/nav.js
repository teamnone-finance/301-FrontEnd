import React from 'react';

export default class Nav extends React.Component {
  render() {
    const { url } = this.props

    console.log('this.props in ticker.js',this.props);

    return (
      <ul>
        Bloop
      </ul>
    )
  }
}