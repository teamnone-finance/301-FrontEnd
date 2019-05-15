import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from './header.js';
import Company from './companyInfo';
import SearchForm from './search-form.js';
import superagent from 'superagent';
import Footer from './footer.js';
import Main from './main.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        loggedIn: true,
        name: ''
      }
    };
  }

  setStateData = (stateKey, stateData) => {
    this.state.user[stateKey] = stateData;
    this.setState({ user: this.state.user });
    console.log('this.state after setStateData: ',this.state);
  };

  //this is to handle the login page
  handleLoggedStatus = async () => {
    console.log('User entered was: ',this.state.user.name);
    let dbCheckResponse = await superagent
      .get(`${___API_URL____}/user`)
      .query({ username: this.state.user.name });
    console.log('query response', dbCheckResponse);

    if (dbCheckResponse.body.rowCount > 0) {
      console.log(`user in db`);
      this.setStateData('loggedIn', true);
      localStorage.setItem('loggedIn', true);
      window.location.href='/portfolio';//comment this out if you are checking on log in page
      //load portfolio page
    } else {
      //add user to db
      console.log('new user -- going to add in database');
      superagent
        .post(`${___API_URL____}/user`)
        .send({ name: this.state.user.name });
        this.setStateData('loggedIn', true);

        window.location.href='/portfolio';//comment this out if you are checking on log in page
      //load create portfolio page.
        localStorage.setItem('loggedIn', true);
    }
    console.log('this.state after handleLoggedStat: ',this.state);
  };

  render() {
    
    return (
      <>
      <Header loggedIn={this.state.user.loggedIn} handleLogin={this.handleLoggedStatus}
            updateState={this.setStateData}/>
            {/* <Main/> */}
      <Footer />
      </>
    );
  }
} //end of <App>

export default App;
