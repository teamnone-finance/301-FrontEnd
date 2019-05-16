import React from 'react';
import Card from './card.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import superagent from 'superagent';

const ___API_URL____ = 'http://localhost:3000';
// const ___API_URL____ = 'https://market-app-backend.herokuapp.com';

export default class Portfolio extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      portfolio: []
    };
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    let username = localStorage.getItem('username');
    this.getStocks(username);
  }
  
  getStocks = async (username) => {
    let portfolioRes = await superagent
    .get(`${___API_URL____}/stocks`)
    .query({ username: username })
    .catch(err => console.log(err));
    // console.log('STOCKS RESPONSE: ',portfolioRes.body.rows);

    let rows = portfolioRes.body.rows;
    let portfolio = rows.map((val)=>{
      return val.symbol;
    });

    console.log(`${username}'s portfolio is `,portfolio);

    this.setState({portfolio: portfolio});
    console.log('STATE OF PORTFOLLIO NOW: ',this.state);
  }

  render(){

    let portfolio = this.state.portfolio.map((val,i)=> {
      return <li key={i}>
        <Card symbol={val}/>
      </li>
    });

    return(
      <React.Fragment>
        <h2 id="portfolio-h2">My Portfolio</h2>
        <section id="portfolio">
          <p>Welcome back to your portfolio. I hope all of your stocks were up today and that the bulls are beating the bears. Search for stocks of interest and add or delete from your portfolio.</p>
          <ul>Placeholder - portfolio name 
          {portfolio}
          </ul>
        </section>

      </React.Fragment>
    );
  }
}