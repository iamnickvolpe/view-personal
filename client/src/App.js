import React, { Component } from 'react';
import 'normalize.css';
import './App.scss';
import Home from './modules/Home.js';
import Remote from './modules/Remote.js'
import { Route, Switch } from 'react-router-dom';
import io from "socket.io-client";

class App extends Component {
  render() {
    let socket;
    if (process.env.NODE_ENV === "development") {
      socket = io("localhost:3000");
    } else {
      socket = io();
    }
    return (
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Remote {...props} socket={socket} />} />
          <Route exact path="/app" render={(props) => <Home {...props} socket={socket} />} />
        </Switch>
      </div>
    )
  }
}

export default App;