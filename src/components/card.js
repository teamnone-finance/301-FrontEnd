import React from 'react';
import superagent from 'superagent';

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

  // response.body[key]
  //get the data and set state ?  --> change this to input what is passed in props

  updateCardState = async (info, descr) => {
    console.log(info, descr);
    this.setState({
      company: info.body.companyName,
<<<<<<< HEAD
      description: descr.body.description,
      nowPrice: info.body.nowPrice,
      opening: info.body.opening,
      yrHigh: info.body.yrHigh,
      yrLow: info.body.yrLow,
      mktCap: info.body.mktCap,
      peRatio: info.body.peRatio,
      volume: info.body.volume,
      volumeToday: info.body.volumeToday
=======
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
>>>>>>> b303f5dea4ef6d4ce0d8c1facf31e5ee254d1dd5
    });
  };

  companyInfo = async () => {
    console.log(`this company info is running`);
    let output = await superagent
<<<<<<< HEAD
      .get('https://localhost:4000/stockdescription')
=======
      .get('https://market-app-backend.herokuapp.com/get-company')
>>>>>>> b303f5dea4ef6d4ce0d8c1facf31e5ee254d1dd5
      .query({ symbol: 'aapl' })
      .catch(err => console.log(err));
    console.log(`this is the result of the card query`, output);
    return output;
  };
  cardInfo = async () => {
    console.log(`this card info is running`);
    let output = await superagent
<<<<<<< HEAD
      .get('https://localhost:4000/stockinfo')
      .query({ symbol: 'aapl' })
      .catch(err => console.log(err));
    console.log(`this is the result of the card query`, output);
    return output;
  };

  componentDidMount() {
    let x = this.cardInfo();
    let y = this.companyInfo();
=======
      .get('https://market-app-backend.herokuapp.com/get-quote')
      .query({ symbol: 'aapl' })
      .catch(err => console.log(err));
    console.log(`this is the result of the card query`, output.body);
    return output;
  };

  async componentDidMount() {
    let x = await this.cardInfo();
    let y = await this.companyInfo();
>>>>>>> b303f5dea4ef6d4ce0d8c1facf31e5ee254d1dd5
    this.updateCardState(x, y);
  }

  render() {
    return (
      <section className='card'>
        <div id='name'>
<<<<<<< HEAD
          <h2>Symbol</h2>
          <h4>Company</h4>
        </div>
        <div id='price'>
          <h2>RealTimePrice</h2>
        </div>
        <div id='description'>
          <p>Company description stuff</p>
        </div>
        <div id='stats'>
          <ul>
            <li>open price</li>
            <li>52 wk high</li>
            <li>52 wk low</li>
            <li>market cap</li>
            <li>PE ratio</li>
            <li>latest volume</li>
=======
          <h2>{this.state.symbol}</h2>
          <h4>{this.state.company}</h4>
        </div>
        <div id='price'>
          <h2>{this.state.nowPrice}</h2>
        </div>
        <div id='description'>
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
>>>>>>> b303f5dea4ef6d4ce0d8c1facf31e5ee254d1dd5
          </ul>
        </div>
        {/* <Line/> react chartJS component ? or canvas for a chartJS chart */}
      </section>
    );
  }
}

<<<<<<< HEAD
export default Card;
=======
export default Card;
>>>>>>> b303f5dea4ef6d4ce0d8c1facf31e5ee254d1dd5
