import React from 'react';
import superagent from 'superagent';

let __API_URL__ = 'https://market-app-backend.herokuapp.com/';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_query: '',
    };
  }

  // handleSearchKeyword = e => {
  //   let search_query = e.target.value;
  //   this.setState({ search_query });
  // };

  handleSubmit = async e => {
    e.preventDefault();

    let APIData = await superagent.get(`${__API_URL__}`);
    console.log(APIData.text);

    // let locationData = await superagent.get(`${__API_URL__}/location`).query({ data : query });
    // let weatherData = await superagent.get(`${__API_URL__}/weather`).query({data : locationData.body});
    // let yelpData = await superagent.get(`${__API_URL__}/yelp`).query({data : locationData.body});
    // let moviesData = await superagent.get(`${__API_URL__}/movies`).query({data : locationData.body});
    // let eventsData = await superagent.get(`${__API_URL__}/events`).query({data : locationData.body});


    let apiResults = {
      sample: APIData.text
    }

    console.log('API RESULTS : ',apiResults);
    this.props.callback(apiResults);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <input onChange={this.handleSearchKeyword} /> */}
        <button onClick={this.handleSubmit}>Sample</button>
      </form>
    );
  }
}

export default SearchForm;
