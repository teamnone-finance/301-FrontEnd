import React, { Fragment } from 'react';
import superagent from 'superagent';
import Search from './search-form';
import { Line } from 'react-chartjs-2';
import SearchForm from './search-form.js';
import Card from './card.js';

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

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chartReport: null, companyData: null, backend: 'https://market-app-backend.herokuapp.com'};
  }
    
    load = () => {
      let symbol = this.props.symbol;
      // let symbol = 'AAPL';
      this.getCompany(symbol);
      this.getRapidReports(symbol, '1d');
    }

    getRapidReports = async (symbol, time) => {
      let dailyReport = await superagent
      .get(`${this.state.backend}/get-stocks-chart?symbol=${symbol}&time=${time}`)
      .catch(err => console.log(err));
      console.log('DAILY REPORT: RAPID REPORTS: ',dailyReport);
      this.setState({ chartReport: dailyReport.body });
    }

    getCompany = async(symbol) => {
      let companyReport = await superagent
      .get(`${this.state.backend}/get-company?symbol=${symbol}`)
      .catch(err => console.log(err));
      console.log(companyReport.body);
      this.setState({companyData: companyReport.body})
    }
  

  componentDidMount() {
    this.load();
  }

  render() {
    let buttons;
    let chart;
    let summary;
    let time;
    let data;
    let reports = [];
    if (this.state.chartReport !== null) {
      console.log(this.state.chartReport);
      time = this.state.chartReport.filter(object => object['close'] > 0).map(object => object['label']);
      data = this.state.chartReport.filter(object => object['close'] > 0).map(object => object['close']);
      chart =  <div style={{ 'width': '800px', 'margin': '50px auto' }}>
                  <Line data={createChart(time, data)} options={options} />
                </div>;
      buttons = <div style={{'width': '50%', 'margin': '10px auto', 'border': 'solid'}}>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '1d')} className="range-toggle">1 day</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '1m')} className="range-toggle">1 month</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '3m')} className="range-toggle">3 month</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '6m')} className="range-toggle">6 month</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '1y')} className="range-toggle">1 year</button>
                  <button onClick={event => this.getRapidReports(this.state.companyData['symbol'], '5y')} className="range-toggle">5 year</button>
                </div>;
    }

    return (
      <Fragment>
        <div>
          {buttons}
          {chart}
        </div>
      </Fragment>
    );
  }
}
