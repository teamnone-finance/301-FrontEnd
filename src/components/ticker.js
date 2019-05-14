import React from 'react';

export default class Ticker extends React.Component {
  componentDidMount() {
    if (!window.doBuild) {
      this.preloadWidgetScript();
    } else {
      window.doBuild();
    }
  }
  
  preloadWidgetScript = () => {
    const script = document.createElement('script');
    script.async = true;
    script.dataset.pinBuild = 'doBuild';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.textContent = `  {
      "symbols": [
        {
          "description": "Amazon",
          "proName": "NASDAQ:AMZN"
        },
        {
          "description": "Google",
          "proName": "NASDAQ:GOOG"
        },
        {
          "description": "Facebook",
          "proName": "NASDAQ:FB"
        },
        {
          "description": "Boeing",
          "proName": "NYSE:BA"
        },
        {
          "description": "Costco",
          "proName": "NASDAQ:COST"
        },
        {
          "description": "Microsoft",
          "proName": "NASDAQ:MSFT"
        },
        {
          "description": "Apple",
          "proName": "NASDAQ:AAPL"
        },
        {
          "description": "Oracle",
          "proName": "NYSE:ORCL"
        },
        {
          "description": "Workday",
          "proName": "NASDAQ:WDAY"
        }
      ],
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    }`;
    const ticker = document.getElementsByClassName('ticker');
    document.body.appendChild(script);
    console.log(script);
  }

  render() {
    const { url } = this.props

    console.log(this.props);

    return (
      <a data-pin-do="embedPin" data-pin-build="doBuild" href={url}>
        {url}
      </a>
    )
  }
}
