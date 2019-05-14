import React from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
      data: {
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
      }
    
    };
  }

  setStateData = stateData => {
    this.setState(stateData)
    console.log(this.state);
};

  render() {
    let script = React.createElement('script', {
      src: 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
      async: true,
      type: 'text/javascript'
    });

    return (
      <>
      <div className="tradingview-widget-container">
      {script}
      </div>
      </>
    );
  }
}//end of <App>

export default Nav;