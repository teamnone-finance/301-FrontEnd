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

    this.handleSubmit = (event) => {
      event.preventDefault();
      const backend = 'http://localhost:3000/get-stocks';
      return superagent(backend)
        .query(
          {
            symbol: event.target.stock.value
          })
        .then(result => {
          this.setState({ company: result.body['Time Series (5min)'] });
        });
    }
  }

  render() {
    let chart;
    let time;
    let data;
    let reports = [];
    if (this.state.company !== null) {
      console.log('yeah')
      time = Object.keys(this.state.company);
      data = Object.values(this.state.company);
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

