import React from 'react';
import Main from './main.js';
import LoginPage from './loginPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Nav extends React.Component {
  render() {
    let loggedIn = this.props.loggedIn;
    console.log('Props: ', this.props);
    let navArr = [];

    if (loggedIn) {
      navArr.push(
        <li key={1}>
          <Link to='/' />
        </li>
      );
    } else {
      navArr.push(
        <li key={1}>
          <a href={'/login'}>Log In</a>
        </li>
      );
    }

    navArr.push(
      <li key={2}>
        <a href={'/main'}>Stock History</a>
      </li>
    );

    navArr.push(
      <li key={3}>
        <a href={'#'}>About Us</a>
      </li>
    );

    return (
      <React.Fragment>
        <Router>
          <div>
            <ul id='nav'>{navArr}</ul>
            <Route exact path='/' component={Main} />

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
            {/* <Route path="/about" component={About} /> */}
          </div>
        </Router>
      </React.Fragment>
    );
  } //end of render
} //end of class
