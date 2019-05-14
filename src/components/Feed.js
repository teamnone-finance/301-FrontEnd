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
    let newsData = await superagent.get(`https://stocknewsapi.com//api/v1/category?section=general&items=5&token=negluvhstrs51wlydumbjvtbg0ulq0rrhgf0b3bu`);    
      this.setState({newsResults: newsData.body.data})
      console.log(newsData);
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
      <section id='news' className='newsfeed-container'>
      <h2>Market News Feed</h2>
    {this.state.newsResults.map((val, idx) => {
      return (
        <div>
             <li key={idx}>
                <a href={ val.news_url }>{ val.title }</a>
                <img alt='news' src={val.image_url}/>
                <p>{ val.text }</p>
                <p>{ val.source_name }</p>
                <p>{ val.date }</p>
            </li>
        </div>
        );
      })}
    </section>
    )
  }
}

export default Feed;