import React from 'react';
import Ticker from './ticker.js';
import Nav from './nav.js';

export default class Header extends React.Component {

  render(){

  return (
    <header>
      <h1>Market App</h1>
      <p>This is Team None</p>
      <div id="ticker">
        <Ticker className="ticker" />
      </div>
      <div>
        <Nav loggedIn={this.props.logged}/>
      </div>
    </header>
  );
  }
}