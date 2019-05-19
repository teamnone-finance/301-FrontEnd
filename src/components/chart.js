import React, { Fragment } from 'react';
import superagent from 'superagent';
import { Line } from 'react-chartjs-2';

function createChart(label, data, symbol) {
  return {
    labels: label,
    datasets: [
      {
        label: symbol,
        backgroundColor: 'rgba(255,200,255,1)',
        fillColor: 'rgba(255,255,255,255.2)',
        strokeColor: 'rgba(255,255,255,1)',
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

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartReport: null,
      companyData: null,
      backend: 'https://market-app-backend.herokuapp.com'
    };
  }

  load = () => {
    let symbol = this.props.symbol;
    this.getCompany(symbol);
    this.getRapidReports(symbol, '1d');
  };

  getRapidReports = async (symbol, time) => {
    let dailyReport = await superagent
      .get(
        `${this.state.backend}/get-stocks-chart?symbol=${symbol}&time=${time}`
      )
      .catch(err => console.log(err));
    this.setState({ chartReport: dailyReport.body });
  };

  getCompany = async symbol => {
    let companyReport = await superagent
      .get(`${this.state.backend}/get-company?symbol=${symbol}`)
      .catch(err => console.log(err));
    this.setState({ companyData: companyReport.body });
  };

  componentDidMount() {
    this.load();
  }

  render() {
    let buttons;
    let chart;
    let time;
    let data;
    if (this.state.chartReport !== null && this.state.companyData !== null) {
      time = this.state.chartReport
        .filter(object => object['close'] > 0)
        .map(object => object['label']);
      data = this.state.chartReport
        .filter(object => object['close'] > 0)
        .map(object => object['close']);
      chart = (
        <div id='stockChart' style={{ width: '100%', margin: '50px auto' }}>
          <Line
            data={createChart(time, data, this.state.companyData['symbol'])}
            options={options}
          />
        </div>
      );
      buttons = (
        <div
          className='button-align'
          style={{ width: '100%', margin: '10px auto' }}
        >
          <button
            className='button-align'
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '1d')
            }
            className='range-toggle'
          >
            1 day
          </button>
          <button
            className='button-align'
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '1m')
            }
            className='range-toggle'
          >
            1 month
          </button>
          <button
            className='button-align'
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '3m')
            }
            className='range-toggle'
          >
            3 month
          </button>
          <button
            className='button-align'
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '6m')
            }
            className='range-toggle'
          >
            6 month
          </button>
          <button
            className='button-align'
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '1y')
            }
            className='range-toggle'
          >
            1 year
          </button>
          <button
            className='button-align'
            onClick={event =>
              this.getRapidReports(this.state.companyData['symbol'], '5y')
            }
            className='range-toggle'
          >
            5 year
          </button>
        </div>
      );
    }

    return (
      <Fragment>
        <div className='chartStock'>
          {buttons}
          {chart}
        </div>
      </Fragment>
    );
  }
}
