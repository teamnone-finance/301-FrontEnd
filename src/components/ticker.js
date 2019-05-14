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
    document.body.appendChild(script);
  }

  render() {
    const { url } = this.props

    return (
      <a data-pin-do="embedPin" data-pin-build="doBuild" href={url}>
        {url}
      </a>
    )
  }
}
