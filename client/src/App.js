import React, { Component } from 'react';
import 'normalize.css';
import './App.scss';
import Home from './modules/Home.js';
import Remote from './modules/Remote.js'
import { Route, Switch } from 'react-router-dom';
import io from "socket.io-client";

function getSocket() {
  if (process.env.NODE_ENV === "development") {
    return io("localhost:3000");
  } else {
    return io();
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Remote {...props} socket={getSocket()} />} />
          <Route path="/app" render={(props) => <Home {...props} socket={getSocket()} />} />
        </Switch>
      </div>
    )
  }
}

export default App;