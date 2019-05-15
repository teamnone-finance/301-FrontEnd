import React, { Fragment } from 'react';
import superagent from 'superagent';
import Search from './search-form';
import {Line} from 'react-chartjs-2';

function createChart(label, data) {
  return {
    labels: label.reverse(),
    datasets: [
      {
        label: 'Stock',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        data: data.map(object => object['1. open']).reverse(),
      },
    ]
  }
}


const options = {
}


export default class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = { company: null };
    this.handleSubmit = async (event) => {
      event.preventDefault();
      let query = event.target.stock.value.toString();
      const backend = 'http://localhost:3000/';
      let dailyReport = await superagent.get(backend+'get-stocks-intraday?symbol='+query);
      let monthlyReport = await superagent.get(backend+'get-stocks-monthly?symbol='+query);
      let companyName = await superagent.get(backend+'get-stocks-quote?symbol='+query);
      let summaryReport = await superagent.get(backend+'get-stocks-summary?symbol='+query);
      this.setState({company: {daily:dailyReport.body['Time Series (5min)'], monthly:monthlyReport.body['Monthly Time Series'], name:companyName.body['bestMatches'][0]['2. name'], summary:summaryReport.body['Global Quote']}});
    }
  }

  render() {
    let chart;
    let time;
    let data;
    let reports = [];
    if (this.state.company !== null) {
      console.log(this.state.company.summary);
      time = Object.keys(this.state.company.daily);
      data = Object.values(this.state.company.daily);
      chart = <Line data={createChart(time, data)}
      options={options}/>

      for (let i = 0; i < time.length; i++) {
        reports.push(<li key={i}>{`${time[i]} - Open: ${data[i]['1. open']}, Closed: ${data[i]['2. high']}`}</li>)
      }
    }

    return (
      <Fragment>
        <Search handleSubmit={this.handleSubmit} />
        <div>
          <div width="400px" height="250px">
          {chart}

          </div>
          <ul>
            {reports}
          </ul>
        </div>
      </Fragment>
    );
  }
}

