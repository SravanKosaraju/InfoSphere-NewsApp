import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;
apikey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setprogress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/Home" element={<News apikey={this.apikey} setprogress={this.setprogress} pageSize={this.pageSize} country="in" category="" />} />
            <Route path="/" element={<News apikey={this.apikey} setprogress={this.setprogress} pageSize={this.pageSize} country="in" category="" />} />
            <Route path="/Business" element={<News apikey={this.apikey} setprogress={this.setprogress} pageSize={this.pageSize} country="in" category="business" />} />
            <Route path="/Entertainment" element={<News apikey={this.apikey} setprogress={this.setprogress} pageSize={this.pageSize} country="in" category="Entertainment" />} />
            <Route path="/General" element={<News apikey={this.apikey} setprogress={this.setprogress} pageSize={this.pageSize} country="in" category="General" />} />
            <Route path="/Health" element={<News apikey={this.apikey} setprogress={this.setprogress} pageSize={this.pageSize} country="in" category="Health" />} />
            <Route path="/Science" element={<News apikey={this.apikey} setprogress={this.setprogress} pageSize={this.pageSize} country="in" category="science" />} />
            <Route path="/Sports" element={<News apikey={this.apikey} setprogress={this.setprogress} pageSize={this.pageSize} country="in" category="Sports" />} />
            <Route path="/Technology" element={<News apikey={this.apikey} setprogress={this.setprogress} pageSize={this.pageSize} country="in" category="Technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

