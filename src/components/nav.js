import React from 'react';

export default class Nav extends React.Component {
  
  render() {
    let loggedIn = this.props.loggedIn;
    console.log('Props: ',this.props);
    let navArr = [];
   
    if (loggedIn){
      navArr.push(<li key = {1}><a href={'#'}>My Portfolio</a></li>);
    } else{
      navArr.push(<li key = {1}><a href={'#'}>Log In</a></li>);
    }

    navArr.push(<li key = {2}><a href={'#'}>Stock History</a></li>);

    navArr.push(<li key = {2}><a href={'#'}>About Us</a></li>);

    return (
      <React.Fragment>
        <ul id="nav">{navArr}</ul>
      </React.Fragment>
    );
  }//end of render
}