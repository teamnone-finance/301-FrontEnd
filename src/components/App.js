import React from 'react';
import Header from './header.js';
import SearchForm from './search-form.js';
import superagent from 'superagent';
import NewPortfolio from './newPortfolio.js';
import LoginPage from './loginPage.js';
import ChartandFeed from './chartAndFeed.js';

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
      .query({ username: this.state.user.name });
    if (dbCheckResponse.rowCount > 0) {
      this.setStateData('loggedIn', true);
      //load portfolio page
    } else {
      //add user to db
      await superagent
        .post('https://market-app-backend.herokuapp.com/user')
        .query({ username: this.state.user.name });
      this.setStateData('loggedIn', true);
      //load create portfolio page.
    }
  };

  render() {
    if (this.state.user.loggedIn) {
      return (
        <>
          <Header
            loggedIn={this.state.user.loggedIn}
            callback={this.setStateData}
          />
          <SearchForm callback={this.setStateData} />
          {this.state.sample}
          <p>This is happening</p>
          {/* <Portfolio user={this.state.userName} /> */}
          {/* <ChartandFeed /> */}
        </>
      );
    } else {
      return (
        <>
          <Header />
          <SearchForm callback={this.setStateData} />
          {this.state.sample}
          <p>Need to create user and log in</p>
          <LoginPage
            handleLogin={this.handleLoggedStatus}
            updateState={this.setStateData}
          />
          <NewPortfolio user={this.state.user.name} />
          {/* <ChartandFeed /> */}
        </>
      );
    }
  }
} //end of <App>

export default App;
