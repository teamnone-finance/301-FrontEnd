import React, { Fragment } from 'react';
import superagent from 'superagent';
import symbol from '../assets/companyList';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = (event) => {
      return superagent.get(this.alphavantage)

    }
  }

  render() {
    let options = [];
    if (symbol !== undefined) {
      for(let i = 0; i<symbol['Symbol'].length; i++) {
        options.push(<option key = {i} value = {symbol['Symbol'][i]} />);
      }
    };

    return (
      <>
      <form id="search-form" onSubmit={event => this.props.handleSubmit(event)}>
        <label id="label-search" htmlFor="stock">Enter Stock Symbol</label>
        <input id="input-search" list="symbols" name="stock" type="text" autoComplete="on"/>
        <datalist id="symbols">
          {options}
        </datalist>
        <input id="input-search-submit" type="submit" />
      </form>
      </>
    );
  }
}

