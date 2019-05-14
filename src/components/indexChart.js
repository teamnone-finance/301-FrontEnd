import React from 'react';

export default class IndexChart extends React.Component {
  componentDidMount() {
    if (!window.doBuild) {
      this.preLoadScript();
    } else {
      window.doBuild();
    }
  }
  
  preLoadScript = () => {
    const script = document.createElement('script');
    script.async = true;
    script.dataset.pinBuild = 'doBuild';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.textContent = ` { "showChart": true,
    "locale": "en",
    "largeChartUrl": "",
    "width": "400",
    "height": "660",
    "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
    "plotLineColorFalling": "rgba(33, 150, 243, 1)",
    "gridLineColor": "rgba(233, 233, 234, 1)",
    "scaleFontColor": "rgba(131, 136, 141, 1)",
    "belowLineFillColorGrowing": "rgba(5, 122, 205, 0.12)",
    "belowLineFillColorFalling": "rgba(5, 122, 205, 0.12)",
    "symbolActiveColor": "rgba(225, 239, 249, 1)",
    "tabs": [
      {
        "title": "Indices",
        "symbols": [
          {
            "s": "OANDA:SPX500USD",
            "d": "S&P 500"
          },
          {
            "s": "FOREXCOM:DJI",
            "d": "Dow 30"
          },
          {
            "s": "OANDA:UK100GBP",
            "d": "FTSE 100"
          },
          {
            "s": "NASDAQ:RILYZ",
            "d": "Nasdaq"
          },
          {
            "s": "INDEX:NKY",
            "d": "Nikkei"
          },
          {
            "s": "LSE:LSE",
            "d": "London SE"
          },
          {
            "s": "DJ:DJI",
            "d": "Dow Jones "
          }
        ],
        "originalTitle": "Indices"
      },
      {
        "title": "Commodities",
        "symbols": [
          {
            "s": "CME_MINI:ES1!",
            "d": "E-Mini S&P"
          },
          {
            "s": "CME:E61!",
            "d": "Euro"
          },
          {
            "s": "COMEX:GC1!",
            "d": "Gold"
          },
          {
            "s": "NYMEX:CL1!",
            "d": "Crude Oil"
          },
          {
            "s": "NYMEX:NG1!",
            "d": "Natural Gas"
          },
          {
            "s": "CBOT:ZC1!",
            "d": "Corn"
          }
        ],
        "originalTitle": "Commodities"
      },
      {
        "title": "Bonds",
        "symbols": [
          {
            "s": "CME:GE1!",
            "d": "Eurodollar"
          },
          {
            "s": "CBOT:ZB1!",
            "d": "T-Bond"
          },
          {
            "s": "CBOT:UD1!",
            "d": "Ultra T-Bond"
          },
          {
            "s": "EUREX:GG1!",
            "d": "Euro Bund"
          },
          {
            "s": "EUREX:II1!",
            "d": "Euro BTP"
          },
          {
            "s": "EUREX:HR1!",
            "d": "Euro BOBL"
          }
        ],
        "originalTitle": "Bonds"
      },
      {
        "title": "Forex",
        "symbols": [
          {
            "s": "FX:EURUSD"
          },
          {
            "s": "FX:GBPUSD"
          },
          {
            "s": "FX:USDJPY"
          },
          {
            "s": "FX:USDCHF"
          },
          {
            "s": "FX:AUDUSD"
          },
          {
            "s": "FX:USDCAD"
          }
        ],
        "originalTitle": "Forex"
      }
    ]
  }`;
  const indexChart = document.getElementById('indexChart');
  indexChart.appendChild(script);
  console.log('SCRIPT ---- ',script);
}


  render() {

    return (
      <a data-pin-do="embedPin" data-pin-build="doBuild" ></a>
    )
  }
}