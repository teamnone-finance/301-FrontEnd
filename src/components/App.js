import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from './header.js';
import SearchForm from './search-form.js';
import superagent from 'superagent';
import NewPortfolio from './newPortfolio.js';
import LoginPage from './loginPage.js';
import ChartandFeed from './chartAndFeed.js';
import AboutUs from './aboutUs.js';
import Footer from './footer.js';
import Main from './main.js';
import Portfolio from './portfolio.js';


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
    console.log('this.state after setStateData: ',this.state);
  };

  //this is to handle the login page
  handleLoggedStatus = async () => {
    console.log('User entered was: ',this.state.user.name);
    let dbCheckResponse = await superagent
      .get('https://market-app-backend.herokuapp.com/user')
      .query({ username: this.state.user.name });
    console.log('query response', dbCheckResponse);

    if (dbCheckResponse.body.rowCount > 0) {
      console.log(`user in db`);
      this.setStateData('loggedIn', true);
      // window.location.href='/portfolio';
      //load portfolio page
    } else {
      //add user to db
      console.log('new user -- going to add in database');
      superagent
        .post('https://market-app-backend.herokuapp.com/user')
        .query({ username: this.state.user.name });
        this.setStateData('loggedIn', true);
      //load create portfolio page.
    }
    console.log('this.state after handleLoggedStat: ',this.state);
  };

  render() {

    if (this.state.user.loggedIn) {
      return (
        <>
          <Header loggedIn={this.state.user.loggedIn} handleLogin={this.handleLoggedStatus}
            updateState={this.setStateData}/>
          {/* <Portfolio user={this.state.userName} /> */}
          <Portfolio />
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Header handleLogin={this.handleLoggedStatus}
            updateState={this.setStateData}/>
          {/* <Main /> */}
          <Footer/>
        </>
      );
    }
  }
} //end of <App>

export default App;
