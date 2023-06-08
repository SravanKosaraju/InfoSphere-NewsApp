import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
export default class News extends Component {
  static defaulprops = {
    country: "us",
    pageSize: 8,
    category: "science"
  }
  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `InfoSphere-${this.props.category}`
  }

  async updatenews() {
    this.props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setprogress(30);
    let parseddata = await data.json();
    this.props.setprogress(70);
    this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults, loading: false })
    this.props.setprogress(100)
  }

  async componentDidMount() {
    this.updatenews()
  }

  // handleprevclick = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updatenews()
  // }

  // handlenextclick = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updatenews()
  // }

  fetchMoreData = async () => {
    // a fake async api call like which sends
    this.setState({
      page: this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({ articles: this.state.articles.concat(parseddata.articles), totalResults: parseddata.totalResults })
  };


  render() {
    return (
      <>
        <h1 className='text-center' style={{ margin: "40px 0px" }}>InfoSphere - Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          scrollableTarget="scrollableDiv"
        >
          <div className='container my-3'>
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div key={element.url} className='col-md-4'>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          {<button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Previous</button>}
          {<button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>}
        </div> */}
      </>
    )
  }
}
