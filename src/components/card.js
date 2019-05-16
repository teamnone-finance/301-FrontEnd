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
    console.log(info, descr);
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
    console.log(`this company info is running`);
    let output = await superagent
      .get('https://market-app-backend.herokuapp.com/get-company')
      .query({ symbol: this.props.symbol })
      .catch(err => console.log(err));
    console.log(`this is the result of the card query`, output);
    return output;
  };
  cardInfo = async () => {
    console.log(`this card info is running`);
    let output = await superagent
      .get('https://market-app-backend.herokuapp.com/get-quote')
      .query({ symbol: this.props.symbol })
      .catch(err => console.log(err));
    console.log(`this is the result of the card query`, output.body);
    return output;
  };

  async componentDidMount() {
    let x = await this.cardInfo();
    let y = await this.companyInfo();
    this.updateCardState(x, y);
  }

  render() {
    return (
      <section className='card'>
        <div id='name'>
          <h2>{this.state.symbol}</h2>
          <h4>{this.state.company}</h4>
        </div>
        <div id='price'>
          <h2>{this.state.nowPrice}</h2>
        </div>
        <Chart symbol={this.props.symbol} />
        <div id='description'>
          Company Info
          <p>{this.state.description}</p>
        </div>
        <div id='stats'>
          <ul>
            <li>Open: {this.state.opening} </li>
            <li>52 Wk High: {this.state.yrHigh} </li>
            <li>52 Wk Low: {this.state.yrLow} </li>
            <li>Market Cap: {this.state.mktCap}</li>
            <li>PE Ratio: {this.state.peRatio} </li>
            <li>Avg Volume: {this.state.volume} </li>
            <li>Latest Volume: {this.state.volumeToday}</li>
          </ul>
        </div>
      </section>
    );
  }
}

export default Card;
