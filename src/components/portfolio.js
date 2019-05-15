import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import superagent from 'superagent';

export default class Portfolio extends React.Component{
  
  render(){

    let portfolio = new Array(10).fill(
      <li>
        <h4>StockName</h4>
        Price: $$$
        <img src="https://via.placeholder.com/80"></img>
      </li>
    );

    return(
      <React.Fragment>
        <h2 id="portfolio-h2">My Portfolio</h2>
        <section id="portfolio">
          <p>This is your portfolio. Welcome back. I hope today your stocks were up.</p>
          <ul>Placeholder - portfolio name 
          {portfolio}
          </ul>
        </section>

      </React.Fragment>
    );
  }
}