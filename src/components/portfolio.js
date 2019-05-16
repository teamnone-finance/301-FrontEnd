import React from 'react';
import Card from './card.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import superagent from 'superagent';
import { async } from 'q';

const ___API_URL____ = 'https://market-app-backend.herokuapp.com';

export default class Portfolio extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [],
      stocks: [],
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
    let rows = portfolioRes.body.rows;
    let portfolio = rows.map((val)=>{
      return val.symbol;
    });
    this.getStockSummary(portfolio);
  }

  getStockSummary = async (portfolio) => {
    let listofQuotes = []
    for(let i = 0; i < portfolio.length; i++) {
      let stockQuote = await superagent
        .get(`${___API_URL____}/get-quote`)
        .query({symbol: portfolio[i]});
      listofQuotes.push(stockQuote.body);
    }
    this.setState({portfolio: portfolio, stocks: listofQuotes});
  }

  handlehide(event,number) {
    const cardDisplay = document.getElementById(`card${number}`);
    if(event.target.nodeName !== 'BUTTON') {    
      if (cardDisplay.style.height !== '0px'){
        cardDisplay.style.height = 0;
      } else {
        cardDisplay.style.height = '550px';
      }
    }
  }

  handleRemove = async (identifier) => {
    let username = localStorage.getItem('username');
    await superagent
      .delete(`${___API_URL____}/stocks`)
      .query({symbol: this.state.portfolio[identifier], username: username});
    this.load();
  }

  render(){
    let portfolio = this.state.portfolio.map((val,i)=> {
      return (
        <li key={i}>
          <div className="list-container">
            <ul className="list" id={`list${i}`} onClick={event => this.handlehide(event, i)}>
              <li>{this.state.stocks[i]['symbol']}: {this.state.stocks[i]['companyName']}</li>
              <li>{this.state.stocks[i]['latestPrice']}</li>
              <li  style={{color: this.state.stocks[i]['changePercent'] < 0? 'red' : 'green'}}>{(this.state.stocks[i]['changePercent'] * 100).toFixed(2)}%</li>
              <li>
                <button onClick={event=> this.handleRemove(i)}>Remove</button>
              </li>
            </ul>
          </div>
        <Card id={i} symbol={val}/>
      </li>
      )
    });

    return(
      <React.Fragment>
        <h2 id="portfolio-h2">My Portfolio</h2>
        <section id="portfolio">
          <ul>
          {portfolio}
          </ul>
        </section>

      </React.Fragment>
    );
  }
}