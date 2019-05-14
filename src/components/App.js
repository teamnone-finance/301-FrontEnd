import React from 'react';
import Header from './header.js';
import Company from './companyInfo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: 'blob'
    };
  }

  setStateData = stateData => {
    this.setState(stateData)
    console.log(this.state);
}

  render() {
    return (
      <>
        <Header />
        <Company callback={this.setStateData} />
        {this.state.sample}  
      </>
    );
  }
}//end of <App>

export default App;
