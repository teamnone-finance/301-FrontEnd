import React from 'react';

export default class Chart_Widget extends React.Component {
  componentDidMount() {
    if (!window.doBuild) {
      this.preLoadScript();
    } else {
      window.doBuild();
    }
  }
  
  preLoadScript = () => {
    const script1 = document.createElement('script');
    const script2 = document.createElement('script');
    // script2.dataset.pinBuild = 'doBuild';
    script2.async = true;
    script1.src = 'https://s3.tradingview.com/tv.js';
    script2.textContent = `new TradingView.widget(
      {
      "container_id": "basic-area-chart",
      "width": 998,
      "height": 610,
      "symbol": "AAPL",
      "interval": "D",
      "timezone": "exchange",
      "theme": "Light",
      "style": "3",
      "toolbar_bg": "#f1f3f6",
      "hide_top_toolbar": true,
      "save_image": false,
      "locale": "en"
    }
      );`;
    const chartWidget = document.getElementById('chart-widget');
    chartWidget.appendChild(script1);
    chartWidget.appendChild(script2);
  }


  render(){
    return(<></>);
  }
}