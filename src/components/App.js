import React from 'react';
import Header from './header.js';
import SearchForm from './search-form.js';
import superagent from 'superagent';
import NewPortfolio from './newPortfolio.js';
import LoginPage from './loginPage.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: 'blob',
      user: {
        loggedIn: false,
        userName: ''
      }
    };
  }

  setStateData = (stateKey, stateData) => {
    this.state.user[stateKey] = stateData;
    this.setState({ user: this.state.user });
    console.log(this.state);
  };

  //this is to handle the login page
  handleLoggedStatus = () => {
    let dbCheckResponse = superagent
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
          <Header />
          <SearchForm callback={this.setStateData} />
          {this.state.sample}
          <p>This is happening</p>
          {/* <Portfolio user={this.state.userName} /> */}
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
        </>
      );
    }
  }
} //end of <App>

export default App;
