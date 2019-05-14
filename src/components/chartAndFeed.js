import React from 'react';
import Feed from './Feed.js';
import IndexChart from './indexChart.js';

const ChartandFeed = props => {
  return (
    <header>
      <div id="indexChart">
        <IndexChart className="indexChart" />
      </div>
      <div id="feed">
        <Feed />
      </div>

    </header>
  );
};

export default ChartandFeed;