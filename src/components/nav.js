import React from 'react';
import Main from './main.js';
import LoginPage from './loginPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AboutUs from './aboutUs.js';

export default class Nav extends React.Component {
  render() {
    let loggedIn = this.props.loggedIn;
    console.log('Props: ', this.props);
    let navArr = [];

    navArr.push(
      <li key={1}>
        <a href={'/main'}>Home</a>
      </li>
    );
    if (loggedIn) {
      navArr.push(
        <li key={2}>
          <a href={'/'}>My Portfolio</a>
        </li>
      );
    } else {
      navArr.push(
        <li key={2}>
          <a href={'/login'}>Log In</a>
        </li>
      );
    }
    navArr.push(
      <li key={3}>
        <a href={'#'}>Stock History</a>
      </li>
    );
    navArr.push(
      <li key={4}>
        <a href={'/about'}>About Us</a>
      </li>
    );

    return (
      <React.Fragment>
        <Router>
          <ul id='nav'>{navArr}</ul>
          <Route exact path='/' component={Main} />

          <Route path='/about' component={AboutUs} />

          <Route
            path='/login'
            // component={LoginPage}
            render={props => (
              <LoginPage
                {...props}
                updateState={this.props.updateState}
                handleLogin={this.props.handleLogin}
              />
            )}
          />
        </Router>
      </React.Fragment>
    );
  } //end of render
} //end of class
