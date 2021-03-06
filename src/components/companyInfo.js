import React, { Fragment } from 'react';
import superagent from 'superagent';
import { Line } from 'react-chartjs-2';
import SearchForm from './search-form.js';

function createChart(label, data, symbol) {
  return {
    labels: label,
    datasets: [
      {
        label: symbol,
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        data: data
      }
    ]
  };
}

const options = {
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0
    }
  }
};

export default class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartReport: null,
      companyData: null,
      backend: 'https://market-app-backend.herokuapp.com'
    };

    this.handleSubmit = async event => {
      event.preventDefault();
      let symbol = event.target.stock.value;
      await this.getCompany(symbol);
      await this.getRapidReports(symbol, '1d');
    };

    this.getRapidReports = async (symbol, time) => {
      let dailyReport = await superagent.get(
        `${this.state.backend}/get-stocks-chart?symbol=${symbol}&time=${time}`
      );
      if (dailyReport !== undefined) {
        this.setState({ chartReport: dailyReport.body });
      }
    };

    this.getCompany = async symbol => {
      let companyReport = await superagent
        .get(`${this.state.backend}/get-company?symbol=${symbol}`)
        .catch(err => console.log('Error on get is: ', err));
      if (companyReport !== undefined) {
        this.setState({ companyData: companyReport.body });
      }
    };

    this.addToUserPortfolio = async () => {
      let username = localStorage.getItem('username');
      let portfolioPostRes = await superagent
        .post(`${this.state.backend}/stocks`)
        .query({
          username: username,
          symbol: this.state.companyData['symbol']
        });

      this.setState({ companyData: portfolioPostRes.body });
      window.location.href = '/portfolio';
    };
  }

  render() {
    let buttons;
    let chart;
    let time;
    let data;
    let localLoggedIn = localStorage.getItem('loggedIn');
    let addToPortfolio;
    if (this.state.chartReport !== null && this.state.companyData !== null) {
      time = this.state.chartReport
        .filter(object => object['close'] > 0)
        .map(object => object['label']);
      data = this.state.chartReport
        .filter(object => object['close'] > 0)
        .map(object => object['close']);
      chart = (
        <div
          style={{
            width: '800px',
            margin: '50px auto',
            'background-color': 'white'
          }}
        >
          <Line
            data={createChart(time, data, this.state.companyData['symbol'])}
            options={options}
          />
        </div>
      );
      buttons = (
        <div style={{ width: '50%', margin: '10px auto' }}>
          <button
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '1d')
            }
            className='range-toggle'
          >
            1 day
          </button>
          <button
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '1m')
            }
            className='range-toggle'
          >
            1 month
          </button>
          <button
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '3m')
            }
            className='range-toggle'
          >
            3 month
          </button>
          <button
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '6m')
            }
            className='range-toggle'
          >
            6 month
          </button>
          <button
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '1y')
            }
            className='range-toggle'
          >
            1 year
          </button>
          <button
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '5y')
            }
            className='range-toggle'
          >
            5 year
          </button>
        </div>
      );
      if (localLoggedIn) {
        addToPortfolio = (
          <button
            id='button-add-to-portfolio'
            onClick={this.addToUserPortfolio}
          >
            Add to Portfolio
          </button>
        );
      }
    }

    return (
      <Fragment>
        <div id='main'>
          <div id='search-form-div'>
            <SearchForm handleSubmit={this.handleSubmit} />
          </div>
          <div>
            {buttons}
            {chart}
          </div>
          <div id='add-to-portfolio'>{addToPortfolio}</div>
        </div>
      </Fragment>
    );
  }
}
