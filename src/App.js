import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App=()=> {
 var pageSize = 15;
 var apikey=process.env.REACT_APP_NEWS_API
 const [progress,setprogress]=useState(0)

 const setprog=()=>{setprogress(progress)}

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route path="/Home" element={<News apikey={apikey} setprogress={setprog} pageSize={pageSize} country="in" category="" />} />
            <Route path="/" element={<News apikey={apikey} setprogress={setprog} pageSize={pageSize} country="in" category="" />} />
            <Route path="/Business" element={<News apikey={apikey} setprogress={setprog} pageSize={pageSize} country="in" category="business" />} />
            <Route path="/Entertainment" element={<News apikey={apikey} setprogress={setprog} pageSize={pageSize} country="in" category="Entertainment" />} />
            <Route path="/General" element={<News apikey={apikey} setprogress={setprog} pageSize={pageSize} country="in" category="General" />} />
            <Route path="/Health" element={<News apikey={apikey} setprogress={setprog} pageSize={pageSize} country="in" category="Health" />} />
            <Route path="/Science" element={<News apikey={apikey} setprogress={setprog} pageSize={pageSize} country="in" category="science" />} />
            <Route path="/Sports" element={<News apikey={apikey} setprogress={setprog} pageSize={pageSize} country="in" category="Sports" />} />
            <Route path="/Technology" element={<News apikey={apikey} setprogress={setprog} pageSize={pageSize} country="in" category="Technology" />} />
          </Routes>
        </Router>
      </div>
    )
}

export default App

