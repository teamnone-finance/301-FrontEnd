import React from 'react';

export default class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script:
        'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
      tickerData: {
        symbols: [
          {
            description: 'Amazon',
            proName: 'NASDAQ:AMZN'
          },
          {
            description: 'Google',
            proName: 'NASDAQ:GOOG'
          },
          {
            description: 'Facebook',
            proName: 'NASDAQ:FB'
          },
          {
            description: 'Boeing',
            proName: 'NYSE:BA'
          },
          {
            description: 'Costco',
            proName: 'NASDAQ:COST'
          },
          {
            description: 'Microsoft',
            proName: 'NASDAQ:MSFT'
          },
          {
            description: 'Apple',
            proName: 'NASDAQ:AAPL'
          },
          {
            description: 'Oracle',
            proName: 'NYSE:ORCL'
          },
          {
            description: 'Workday',
            proName: 'NASDAQ:WDAY'
          }
        ],
        colorTheme: 'light',
        isTransparent: false,
        displayMode: 'adaptive',
        locale: 'en'
      }
    };
  }

  componentDidMount() {
    const container = document.getElementById('tvs');
    const script = document.createElement('script');
    script.src = this.state.script;
    script.async = true;
    script.text = JSON.stringify(this.state.tickerData);
    container.appendChild(script);
  }

  render() {
    return (
      <div id='tvs' className='tradingview-widget-container'>
        <div className='tradingview-widget-container__widget' />
      </div>
    );
  }
}
