import React from 'react';
import superagent from 'superagent';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: 'User Name'
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log(e.currentTarget[0].value);
    await this.setState({ searchQuery: e.currentTarget[0].value });
    //method to handle logged in / not logged in - pass in username
    await this.props.updateState('name', this.state.searchQuery);
    this.props.handleLogin();
  };

  render() {
    return (
      <>
        <h2>Please Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <input placeholder='User Name' />
          <button>Login</button>
        </form>
      </>
    );
  }
}

export default LoginPage;
