import React from 'react';
import Ticker from './ticker.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Nav from './nav.js';
import Main from './main.js';


export default class Header extends React.Component {

  render(){

  return (
    <header>
      <Router>
      <h1 id="title"><a href={'/main'}>Market App</a></h1>
      <p>This is Team None</p>
      <div id="ticker">
        <Ticker className="ticker" />
      </div>
      <div>
        <Nav  
          handleLogin={this.props.handleLogin}
          updateState={this.props.updateState}
          loggedIn={this.props.loggedIn}/>
      </div>

      </Router>
      
    </header>
  );
  }
}