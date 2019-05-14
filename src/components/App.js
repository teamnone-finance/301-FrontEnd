import React from 'react';
import Header from './header.js';
import SearchForm from './search-form.js';
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

  setStateData = stateData => {
    this.setState(stateData)
    console.log(this.state);
}

  render() {
    return (
      <>
        <Header loggedIn={this.state.loggedIn} callback={this.setStateData}/>
        <SearchForm callback={this.setStateData} />
        {this.state.sample}  
        <ChartandFeed/>
      </>
    );
  }
}//end of <App>

export default App;
