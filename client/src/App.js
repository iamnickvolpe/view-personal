import React, { Component } from 'react';
import 'normalize.css';
import './App.scss';
import Weather from './modules/Weather.js';
import Time from './modules/Time.js';
import Calendar from './modules/Calendar.js';
import Feed from './modules/Feed.js';
import Subway from './modules/Subway.js';
//import TimeImage from './images/gallivantinglife-1150870-unsplash.jpg'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Time /*image={TimeImage}*/ color="#313131" />
        <Weather color="white" />
        <Calendar color="#F6A44D" calendar="nick@iamnickvolpe.com" />
        <Calendar color="#F86A68" calendar="7afrbvotf8p1qcjcpbqp2639as@group.calendar.google.com" />
        <Calendar color="#AC79CA" calendar="jenn.sager@gmail.com" />
        <Feed color="white" />
        <Subway color="#313131" />
        <div className="module"></div>
      </div>
    )
  }
}

export default App;