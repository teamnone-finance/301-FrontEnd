import React from 'react';
import superagent from 'superagent';

class AddToPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAddItemToPortfolio = async e => {
    //get info from input
    let stockSymbol = e.currentTarget[0].value;
    //send post request to db
    superagent.post('/stocks').query({
      username: this.props.user.name,
      stock: stockSymbol,
      portfolio_id: 1
    });
  };

  render() {
    return (
      <>
        <p>Add a stock to your portfolio: </p>
        <SearchForm onSubmit={this.handleAddItemToPortfolio} />
      </>
    );
  }
}

export default AddToPortfolio;
