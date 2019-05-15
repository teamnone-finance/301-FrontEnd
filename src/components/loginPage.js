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
    // console.log(e.currentTarget[0].value);
    let input = document.getElementById('userName');
    console.log(input.textContent);
    await this.setState({ searchQuery: input.textContent });
    //method to handle logged in / not logged in - pass in username
    await this.props.updateState('name', this.state.searchQuery);
    this.props.handleLogin();
  };

  render() {
    return (
      <>
         <h2>Please Log In</h2>
        <form id="login-form">
          <input id="userName" placeholder='User Name'/>
          <button onClick={this.handleSubmit}>Login</button>
        </form>
      </>
    );
  }
}

export default LoginPage;
