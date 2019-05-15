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
    // let newsData = await superagent.get(`https://stocknewsapi.com//api/v1/category?section=general&items=5&token=${process.env.REACT_APP_NEWS_API_KEY}`);
      let newsData = await superagent.get(`https://newsapi.org/v2/everything?q=stocks+finance&from=2019-05-13&to=2019-05-15&sortBy=popularity&apiKey=${process.env.REACT_APP_GN_API_KEY}`);  
      this.setState({newsResults: newsData.body.articles});
      console.log(this.state.newsResults);
      let newsArr = [];

      // for(let i = 0; i < newsData.body.articles.length; i++){
      //   newsArr.push(
      //     <div>
      //        <li key={i}>
      //           <a href={ val.url }>{ val.title }</a>
      //           <img className='generalNewsImg' alt='news' src={val.urlToImage}/>
      //           <p>{ val.description }</p>
      //           <p>{ val.source }</p>
      //           <p>{ val.publishedAt }</p>
      //       </li>
      //   </div>
      //   );
      // }


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
      <h2>Market News Feed</h2>
      <ul id="news">
      {this.state.newsResults.map((val, idx) => {
      return (
        <>
         <li key={idx}>
            <a href={ val.url }>{ val.title }</a>
            <img id='generalNewsImg' alt='news' src={val.urlToImage}/>
            <p>{ val.description }</p>
            <p>{ val.source.name }</p>
            <p>{ val.publishedAt }</p>
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