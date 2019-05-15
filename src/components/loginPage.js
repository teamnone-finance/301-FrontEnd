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
        <form id="login-form">
        <section id="form-section">
        <h2>Log In or Register</h2>
          <input id="userName" placeholder='User Name'/>
          <button onClick={this.handleSubmit}>Login</button>
        </section>
        </form>
      </>
    );
  }
}

export default LoginPage;
