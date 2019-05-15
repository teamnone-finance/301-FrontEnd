import React from 'react';
import Ticker from './ticker.js';
import Nav from './nav.js';
import { BrowserRouter } from "react-router-dom";

export default class Header extends React.Component {

  render(){

  return (
    <header>
      <h1>Market App</h1>
      <p>This is Team None</p>
      {/* <div id="ticker">
        <Ticker className="ticker" />
      </div> */}
      <div>
        <BrowserRouter>
        <Nav  
          handleLogin={this.props.handleLogin}
          updateState={this.props.updateState}
          loggedIn={this.props.loggedIn}/>
        </BrowserRouter>
        
      </div>
    </header>
  );
  }
}