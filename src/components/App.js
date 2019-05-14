import React from 'react';
import Header from './header.js';
import Company from './companyInfo';
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
        loggedIn: true,
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
          <Company callback={this.setStateData} />
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
          <Header />
          <SearchForm callback={this.setStateData} />
          {this.state.sample}
          <ChartandFeed />
          <Footer/>
        </>
      );
    }
  }
} //end of <App>

export default App;
