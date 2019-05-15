import React from 'react';
import SearchForm from './search-form.js';
import ChartandFeed from './chartAndFeed';

export default class Main extends React.Component{
  render(){
    return(
      <>
      {/* <SearchForm callback={this.setStateData} /> */}
      <ChartandFeed />
      </>
    );
  }
}

