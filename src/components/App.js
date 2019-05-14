import React from 'react';
import Header from './header.js';
import SearchForm from './search-form.js';
import superagent from 'superagent';
import NewPortfolio from './newPortfolio.js';
import LoginPage from './loginPage.js';
import ChartandFeed from './chartAndFeed.js';
import Footer from './footer.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


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
    console.log(this.state);
  };

  //this is to handle the login page
  handleLoggedStatus = async () => {
    let dbCheckResponse = await superagent
      .get('https://market-app-backend.herokuapp.com/user')
      .query({ username: this.state.user.userName });
    if (dbCheckResponse.rowCount > 0) {
      this.setState({ loggedIn: true });
      //load portfolio page
    } else {
      //add user to db
      superagent
        .post('https://market-app-backend.herokuapp.com/user')
        .query({ username: this.state.user.userName });
      //load create portfolio page.
    }
  };

  render() {
    
    if (this.state.user.loggedIn) {
      return (
        <>
          <Header loggedIn={this.state.loggedIn} callback={this.setStateData} />
          <SearchForm callback={this.setStateData} />
          {this.state.sample}
          <p>This is happening</p>
          {/* <Portfolio user={this.state.userName} /> */}
          <ChartandFeed />
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Header />
          <SearchForm callback={this.setStateData} />
          {this.state.sample}
          <p>Need to create user and log in</p>
          <NewPortfolio />
          <LoginPage updateState={this.setStateData} />
          <ChartandFeed />
          <Footer/>
        </>
      );
    }
  }
} //end of <App>

export default App;
