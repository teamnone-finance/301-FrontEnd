import React from 'react';
import Main from './main.js';
import LoginPage from './loginPage';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AboutUs from './aboutUs.js';
import Portfolio from './portfolio.js';

export default class Nav extends React.Component {
  
  render() {
    let loggedIn = this.props.loggedIn;
    console.log('Props: ',this.props);
    let navArr = [];
   
    navArr.push(<li key = {1}><a href={'/main'}>Home</a></li>);
    if (loggedIn){
      navArr.push(<li key = {2}><a href={'/portfolio'}>My Portfolio</a></li>);
    } else{
      navArr.push(<li key = {2}><a href={'/login'}>Log In</a></li>);
    }
    navArr.push(<li key = {3}><a href={'#'}>Stock History</a></li>);
    navArr.push(<li key = {4}><a href={'/about'}>About Us</a></li>);
    

    return (
      <React.Fragment>
        <Switch>
      <div>
      <ul id="nav">{navArr}</ul>
        <Route exact path="/main" component={Main} />
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
      </Switch>
      </React.Fragment>
    );
  }//end of render
}//end of class