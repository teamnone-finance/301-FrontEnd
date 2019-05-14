import React from 'react';
import Ticker from './ticker.js';

const Header = props => {
  return (
    <header>
      <h1>Market App</h1>
      <p>This is Team None</p>
      <Ticker />
    </header>
  );
};

export default Header;