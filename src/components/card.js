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
      description: descr.body.description,
      nowPrice: info.body.nowPrice,
      opening: info.body.opening,
      yrHigh: info.body.yrHigh,
      yrLow: info.body.yrLow,
      mktCap: info.body.mktCap,
      peRatio: info.body.peRatio,
      volume: info.body.volume,
      volumeToday: info.body.volumeToday
    });
  };

  companyInfo = async () => {
    console.log(`this company info is running`);
    let output = await superagent
      .get('https://localhost:4000/stockdescription')
      .query({ symbol: 'aapl' })
      .catch(err => console.log(err));
    console.log(`this is the result of the card query`, output);
    return output;
  };
  cardInfo = async () => {
    console.log(`this card info is running`);
    let output = await superagent
      .get('https://localhost:4000/stockinfo')
      .query({ symbol: 'aapl' })
      .catch(err => console.log(err));
    console.log(`this is the result of the card query`, output);
    return output;
  };

  componentDidMount() {
    let x = this.cardInfo();
    let y = this.companyInfo();
    this.updateCardState(x, y);
  }

  render() {
    return (
      <section className='card'>
        <div id='name'>
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
          </ul>
        </div>
        {/* <Line/> react chartJS component ? or canvas for a chartJS chart */}
      </section>
    );
  }
}

export default Card;
