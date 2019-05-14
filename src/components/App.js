import React from 'react';
import Header from './header.js';
import SearchForm from './search-form.js';
import superagent from 'superagent';
import NewPortfolio from './newPortfolio.js';
import LoginPage from './loginPage.js';
import ChartandFeed from './chartAndFeed.js';
import AboutUs from './aboutUs.js';
import Footer from './footer.js';
import Main from './main.js';

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
    console.log('query response', dbCheckResponse);
    if (dbCheckResponse.body.rowCount > 0) {
      console.log(`user in db`);
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
          <Main />
          <ChartandFeed />
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Header
            handleLogin={this.handleLoggedStatus}
            updateState={this.setStateData}
          />
          <SearchForm callback={this.setStateData} />
          {this.state.sample}
          <p>Need to create user and log in</p>
          <LoginPage
            handleLogin={this.handleLoggedStatus}
            updateState={this.setStateData}
          />
          <NewPortfolio user={this.state.user.name} />
          {/* <ChartandFeed /> */}
          <Footer />
        </>
      );
    }
  }
} //end of <App>

export default App;

// if (logged in){
//   if (portfolio){
//     if (items in portfolio){
//       display portfolio;
//     } else {
//         add to portfolio;
//     }
//   } else {
//     create a portfolio;
//   }
// }
