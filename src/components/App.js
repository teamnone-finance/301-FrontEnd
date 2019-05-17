import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './header.js';
import Company from './companyInfo';
import SearchForm from './search-form.js';
import superagent from 'superagent';
import Footer from './footer.js';
import Chart from './chart.js';
import Main from './main.js';
import Card from './card.js';

let ___API_URL____ = 'https://market-app-backend.herokuapp.com';
// let ___API_URL____ = 'http://localhost:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        loggedIn: false,
        name: ''
      }
    };
  }

  setStateData = (stateKey, stateData) => {
    this.state.user[stateKey] = stateData;
    this.setState({ user: this.state.user });
  };

  //this is to handle the login page
  handleLoggedStatus = async () => {
    let dbCheckResponse = await superagent
      .get(`${___API_URL____}/user`)
      .query({ username: this.state.user.name });

    if (dbCheckResponse.body.rowCount > 0) {
      this.setStateData('loggedIn', true);
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('username', this.state.user.name);
      window.location.href = '/portfolio'; //comment this out if you are checking on log in page
      //load portfolio page
    } else {
      //add user to db
      let result = await superagent
        .post(`${___API_URL____}/user`)
        .query({ username: this.state.user.name });
      this.setStateData('loggedIn', true);

      window.location.href = '/portfolio'; //comment this out if you are checking on log in page
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('username', this.state.user.name);
    }
  };

  render() {
    return (
      <>
        <Header
          loggedIn={this.state.user.loggedIn}
          handleLogin={this.handleLoggedStatus}
          updateState={this.setStateData}
          parentState={this.state}
        />

        <Footer />
      </>
    );
  }
} //end of <App>

export default App;
