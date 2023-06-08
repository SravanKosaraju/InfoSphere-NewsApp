import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect,useState } from 'react'
const News=(props)=>{
  document.title = `InfoSphere-${props.category}`
  const [articles,setarticles]=useState([]);
  const [loading,setloading]=useState(true);
  const [page,setpage]=useState(1);
  const [totalResults,settotalResults]=useState(0);

  const updatenews=async ()=> {
    props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
    setloading(true);
    let data = await fetch(url);
    props.setprogress(30);
    let parseddata = await data.json();
    props.setprogress(70);
    setarticles(parseddata.articles);
    settotalResults(parseddata.totalResults);
    setloading(false);
    props.setprogress(100);
  }
useEffect(()=>{
  updatenews();
},[])
  // async componentDidMount() {
  //   this.updatenews()
  // }

  // handleprevclick = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updatenews()
  // }

  // handlenextclick = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updatenews()
  // }

  const fetchMoreData = async () => {
    // a fake async api call like which sends
    setpage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parseddata = await data.json();
    setarticles(articles.concat(parseddata.articles));
    settotalResults(parseddata.totalResults);
  };

    return (
      <>
        <h1 className='text-center' style={{ margin: "40px 0px" }}>InfoSphere - Top {props.category} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          scrollableTarget="scrollableDiv"
        >
          <div className='container my-3'>
            <div className='row'>
              {articles.map((element) => {
                return <div key={element.url} className='col-md-4'>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          {<button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Previous</button>}
          {<button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>}
        </div> */}
      </>
    )
}
 
News.defaulprops = {
  country: "us",
  pageSize: 8,
  category: "science"
}
News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string
}

export default News