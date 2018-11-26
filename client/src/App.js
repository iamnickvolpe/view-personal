import React, { Component } from 'react';
import 'normalize.css';
import './App.scss';
import Weather from './modules/Weather.js';
import Time from './modules/Time.js';
import Calendar from './modules/Calendar.js';
import Feed from './modules/Feed.js';
import Subway from './modules/Subway.js';
import io from "socket.io-client";
import TimeImage from './images/gallivantinglife-1150870-unsplash.jpg'

class App extends Component {
  render() {
    let socket;
    if(process.env.NODE_ENV === "development") {
      socket = io("localhost:3000");
    } else {
      socket = io(window.location.hostname);
    }
    return (
      <div className="App">
        <Time socket={socket} image={TimeImage} color="#313131" />
        <Weather socket={socket} color="white" />
        <Calendar socket={socket} color="#F6A44D" calendar="nick@iamnickvolpe.com" />
        <Calendar socket={socket} color="#F86A68" calendar="7afrbvotf8p1qcjcpbqp2639as@group.calendar.google.com" />
        <Calendar socket={socket} color="#AC79CA" calendar="jenn.sager@gmail.com" />
        <Feed socket={socket} color="white" />
        <Subway socket={socket} color="#313131" />
      </div>
    )
  }
}

export default App;