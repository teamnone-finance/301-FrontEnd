import React from 'react';
import superagent from 'superagent';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newsResults:[]
    }
  }
  
  setNews = async event => {
    let today = Date.now();
      let newsData = await superagent.get(`https://newsapi.org/v2/everything?q=stocks+finance&from=2019-05-15&to=${today}&sortBy=publishedAt&apiKey=${process.env.REACT_APP_GN_API_KEY}`);  

      this.setState({newsResults: newsData.body.articles});
      console.log(this.state.newsResults);
      let newsArr = [];

      console.log( newsData.body);
  };

  componentDidMount() {
    this.setNews();
  };

  componentDidUpdate(prevProps){
    if (this.props.newsResults !== prevProps.newsResults) {
      this.setNews();
    }
  };


  render() {
    return (
      <section id='generalNews' className='newsfeed-container'>
      <ul id="news">
      <h2 id='newsFeedTitle'>Market News Feed</h2>
      {this.state.newsResults.map((val, idx) => {
        let publishedAt = new Date(val.publishedAt).toDateString();
      return (
        <>
         <li key={idx}>
            <a href={ val.url }>{ val.title }</a>
            <p>{ publishedAt }</p>
            <div id='newsDiv'>
              <img id='generalNewsImg' alt='news' src={val.urlToImage}/>
              <p>{ val.description }</p>
            </div>
            <p>Source: { val.source.name }</p>
        </li>
        <hr></hr>
        </>
    );
    })}
      </ul>
    
    </section>
    )
  }
}

export default Feed;