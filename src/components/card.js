import React from 'react';
import superagent from 'superagent';
import Chart from './chart.js';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      description: '',
      symbol: '',
      nowPrice: 1,
      opening: 1,
      yrHigh: 1,
      yrLow: 1,
      mktCap: 1,
      peRatio: 1,
      volume: 1,
      volumeToday: 1
    };
  }

  updateCardState = async (info, descr) => {
    this.setState({
      company: info.body.companyName,
      symbol: info.body.symbol,
      description: descr.body.description,
      nowPrice: info.body.iexRealtimePrice,
      opening: info.body.open,
      yrHigh: info.body.week52High,
      yrLow: info.body.week52Low,
      mktCap: info.body.marketCap,
      peRatio: info.body.peRatio,
      volume: info.body.avgTotalVolume,
      volumeToday: info.body.latestVolume
    });
  };

  companyInfo = async () => {
    let output = await superagent
      .get('https://market-app-backend.herokuapp.com/get-company')
      .query({ symbol: this.props.symbol })
      .catch(err => console.log(err));
    return output;
  };
  cardInfo = async () => {
    let output = await superagent
      .get('https://market-app-backend.herokuapp.com/get-quote')
      .query({ symbol: this.props.symbol })
      .catch(err => console.log(err));
    return output;
  };

  async componentDidMount() {
    let x = await this.cardInfo();
    let y = await this.companyInfo();
    this.updateCardState(x, y);
  }

  render() {
    return (
      <section
        id={`card${this.props.id}`}
        style={{
          height: '0',
          transition: 'height 1s ease-out',
          overflow: 'hidden'
        }}
        className='card'
      >
        <div id='stats'>
          <div>
            <div id='description'>
              <h2>{this.state.company}</h2>
              <p>{this.state.description}</p>
            </div>
            <ul id='data'>
              <li>Open: {this.state.opening} </li>
              <li>52 Wk High: {this.state.yrHigh} </li>
              <li>52 Wk Low: {this.state.yrLow} </li>
              <li>Market Cap: {this.state.mktCap}</li>
              <li>PE Ratio: {this.state.peRatio} </li>
              <li>Avg Volume: {this.state.volume} </li>
              <li>Latest Volume: {this.state.volumeToday}</li>
            </ul>
          </div>
          <div id='chart' style={{ width: '750px' }}>
            <Chart symbol={this.props.symbol} />
          </div>
        </div>
      </section>
    );
  }
}

export default Card;
