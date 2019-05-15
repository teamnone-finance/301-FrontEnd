import React from 'react';

class LoginPage extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    let input = document.getElementById('userName');
    console.log('input.value: ',input.value);
    this.setState({ searchQuery: input.value });
    this.props.updateState('name', input.value);
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
