import React from 'react';
import Main from './main.js';
import LoginPage from './loginPage';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AboutUs from './aboutUs.js';
import Portfolio from './portfolio.js';

export default class Nav extends React.Component {
  
  logout = () => {
    localStorage.removeItem('loggedIn');
    this.props.updateState('loggedIn', false);
    window.location.href='/main';
  };

  render() {
    let loggedIn = this.props.loggedIn;
    console.log('this.props.loggedIn in Nav render(): ',loggedIn);
    console.log('Props: ',this.props);
    let localLoggedIn = localStorage.getItem('loggedIn');
    let navArr = [];
   
    navArr.push(<li key = {1}><a href={'/main'}>Home</a></li>);
    if (loggedIn || localLoggedIn){
      navArr.push(<li key = {2}><a href={'/portfolio'}>My Portfolio</a></li>);
      navArr.push(<li id='logout' key = {4}><a href='#' onClick={this.logout}>Log Out</a></li>);
    } else{
      navArr.push(<li key = {2}><a href={'/login'}>Log In</a></li>);
    }
    navArr.push(<li key = {3}><a href={'#'}>Stock History</a></li>);
    navArr.push(<li key = {4}><a href={'/about'}>About Us</a></li>);
    

    return (
      <React.Fragment>
        <Router>
      <div>
      <ul id="nav">{navArr}</ul>
        <Route path="/main" component={Main} />
        <Route path="/about" component={AboutUs} />
        <Route path="/portfolio" component={Portfolio} />
        <Route
            path='/login'
            // component={LoginPage}
            render={props => (
              <LoginPage
                // {...props}
                updateState={this.props.updateState}
                handleLogin={this.props.handleLogin}
              />
            )}
          />
      </div>
      </Router>
      </React.Fragment>
    );
  }//end of render
}//end of class