import React, { Component } from 'react';
import 'normalize.css';
import './App.scss';
import Weather from './modules/Weather.js';
import Time from './modules/Time.js';
import Calendar from './modules/Calendar.js';
import Feed from './modules/Feed.js';
import Subway from './modules/Subway.js';
import io from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80",
      opacity: "0"
    }
    this.returnSocket = this.returnSocket.bind(this);
  }

  componentDidMount() {
    var that = this;
    this.returnSocket().on("display", function (data) {
      console.log(data)
      if (data.background) {
        that.setState({ background: data.background });
      }
      if (data.opacity) {
        that.setState({ opacity: data.opacity });
      }
    });
  }

  returnSocket() {
    if (process.env.NODE_ENV === "development") {
      return io("localhost:3000");
    } else {
      return io(window.location.hostname);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="cards" style={{ backgroundImage: `url(${this.state.background})` }}>
          <Time color="rgba(0, 0, 0, 0.25)" />
          <Calendar socket={this.returnSocket()} color="rgb(121, 112, 255)" calendar="7afrbvotf8p1qcjcpbqp2639as@group.calendar.google.com" />
          <Calendar socket={this.returnSocket()} color="rgb(253, 147, 72)" calendar="nick@iamnickvolpe.com" />
          <Calendar socket={this.returnSocket()} color="rgb(210, 102, 255)" calendar="jenn.sager@gmail.com" />
          <Weather socket={this.returnSocket()} color="rgba(0, 0, 0, 0.25)" />
          <Subway socket={this.returnSocket()} color="rgba(0, 0, 0, 0.25)" />
          <Feed socket={this.returnSocket()} color="white" />
        </div>
        <div className="cover" style={{opacity: this.state.opacity}}></div>
      </div>
    )
  }
}

export default App;