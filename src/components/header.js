import React from 'react';
import Nav from './nav.js';

const Header = props => {
  return (
    <header>
      <h1>Market App</h1>
      <p>This is Team None</p>
      <Nav />
    </header>
  );
};

export default Header;