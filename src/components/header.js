import React from 'react';
import Ticker from './ticker.js';
import Nav from './nav.js';

const Header = props => {
  return (
    <header>
      <h1>Market App</h1>
      <p>This is Team None</p>
      <div id="ticker">
        <Ticker className="ticker" />
      </div>
      <div>
        <Nav />
      </div>

    </header>
  );
};

export default Header;