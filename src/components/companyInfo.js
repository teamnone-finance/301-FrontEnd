import React, { Fragment } from 'react';
import superagent from 'superagent';
// import Search from './search-form';
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
      this.setState({ chartReport: dailyReport.body });
    };

    this.getCompany = async symbol => {
      let companyReport = await superagent.get(
        `${this.state.backend}/get-company?symbol=${symbol}`
      );
      console.log(companyReport.body);
      this.setState({ companyData: companyReport.body });
    };

    this.drawChartWithProps = async () => {
      await this.getCompany(this.propssymbol);
      await this.getRapidReports(this.propssymbol, '1d');
    };
  }

  render() {
    let buttons;
    let chart;
    let summary;
    let time;
    let data;
    let reports = [];
    if (this.state.chartReport !== null) {
      time = this.state.chartReport
        .filter(object => object['close'] > 0)
        .map(object => object['label']);
      data = this.state.chartReport
        .filter(object => object['close'] > 0)
        .map(object => object['close']);
      chart = (
        <div style={{ width: '800px', margin: '50px auto' }}>
          <Line data={createChart(time, data)} options={options} />
        </div>
      );
      buttons = (
        <div style={{ width: '50%', margin: '10px auto', border: 'solid' }}>
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
    }
    if (!this.props.symbol) {
      return (
        <>
          <Fragment>
            <SearchForm handleSubmit={this.handleSubmit} />
            <div>
              {buttons}
              {chart}
            </div>
          </Fragment>
        </>
      );
    } else {
      this.drawChartWithProps();
      return (
        <>
          <Fragment>
            <div>
              {buttons}
              {chart}
            </div>
          </Fragment>
        </>
      );
    }
  }
}
