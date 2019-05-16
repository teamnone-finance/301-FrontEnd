import React from 'react';
import Card from './card.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import superagent from 'superagent';

export default class Portfolio extends React.Component{
  
  render(){

    let portfolio = new Array(10).fill(
      <li>
        <Card symbol='AAPL'/>
      </li>
    );

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