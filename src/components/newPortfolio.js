import React from 'react';

class NewPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNewPortfolio = e => {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <h2>Create a new Portfolio</h2>
        <form onSubmit={this.handleNewPortfolio}>
          <input />
          <button>Add</button>
        </form>
      </>
    );
  }
}

export default NewPortfolio;
