import React, { Fragment } from 'react';
import superagent from 'superagent';
import Search from './search-form';
import { Line } from 'react-chartjs-2';
import SearchForm from './search-form.js';

function createChart(label, data) {
  return {
    labels: label,
    datasets: [
      {
        label: 'Stock',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        data: data,
      },
    ]
  }
}

const options = {
  scales: {
    xAxes: [{
      gridLines: {
        display: false
      }
    }],
    yAxes: [{
      gridLines: {
        display: false
      }
    }]
  }

}


export default class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chartReport: null, companyData: null, 
      backend: 'https://market-app-backend.herokuapp.com'};
      // backend: 'http://localhost:3000'};

    this.handleSubmit = async (event) => {
      event.preventDefault();
      let symbol = event.target.stock.value;
      console.log('SYMBOL CLICKED IS: ',symbol);
      await this.getCompany(symbol);
      await this.getRapidReports(symbol, '1d');
    }

    this.getRapidReports = async (symbol, time) => {
      let dailyReport = await superagent.get(`${this.state.backend}/get-stocks-chart?symbol=${symbol}&time=${time}`);
      this.setState({ chartReport: dailyReport.body });
    }

    this.getCompany = async(symbol) => {
      console.log('SYMBOL: ',symbol);
      let companyReport = await superagent.get(`${this.state.backend}/get-company?symbol=${symbol}`)
      .catch(err => console.log('Error on get is: ',err));
      console.log(companyReport.body);
      this.setState({companyData: companyReport.body})
    }

    this.addToUserPortfolio = async() => {
      console.log('PARENT USERNAME: ',this.props.parentState.user.name);
      let username = localStorage.getItem('username');
      let portfolioPostRes = await superagent
      .post(`${this.state.backend}/stocks`)
      .query({ username: username, symbol: this.state.companyData['symbol']});

      console.log('PORTFOLIO POST RES: ',portfolioPostRes.body);
      this.setState({companyData: portfolioPostRes.body});
      window.location.href='/portfolio';
    }
  }

  render() {
    let buttons;
    let chart;
    let summary;
    let time;
    let data;
    let localLoggedIn = localStorage.getItem('loggedIn');
    let addToPortfolio;
    let reports = [];
    if (this.state.chartReport !== null) {
      time = this.state.chartReport.filter(object => object['close'] > 0).map(object => object['label']);
      data = this.state.chartReport.filter(object => object['close'] > 0).map(object => object['close']);
      chart =  <div style={{ 'width': '800px', 'margin': '50px auto' }}>
                  <Line data={createChart(time, data)} options={options} />
                </div>;
      buttons = <div style={{'width': '50%', 'margin': '10px auto'}}>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '1d')} className="range-toggle">1 day</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '1m')} className="range-toggle">1 month</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '3m')} className="range-toggle">3 month</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '6m')} className="range-toggle">6 month</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '1y')} className="range-toggle">1 year</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '5y')} className="range-toggle">5 year</button>
                </div>;
        if (localLoggedIn){
            addToPortfolio = <button id="button-add-to-portfolio" onClick={this.addToUserPortfolio}>Add to Portfolio</button>
          // buttonDiv.appendChild(addToPortfolio);
        }
    }

    
    return (
      <Fragment>
        <div id="main">
        <div id="search-form-div">
        <SearchForm handleSubmit={this.handleSubmit} />
        </div>
        <div>
          {buttons}
          {chart}
        </div>
        <div id="add-to-portfolio">{addToPortfolio}</div>
        </div>
      </Fragment>
    );
  }
}

