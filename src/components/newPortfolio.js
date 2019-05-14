import React from 'react';
import superagent from 'superagent';

class NewPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNewPortfolio = e => {
    e.preventDefault();
    superagent
      .post('/portfolio')
      .query({
        username: this.props.user,
        portfolio_name: e.currentTarget[0].value
      });
    console.log(e.currentTarget[0].value);
  };

  render() {
    return (
      <>
        <h2>Create a new Portfolio</h2>
        <form onSubmit={this.handleNewPortfolio}>
          <input placeholder='Portfolio Name' />
          <button>Add</button>
        </form>
      </>
    );
  }
}

export default NewPortfolio;
