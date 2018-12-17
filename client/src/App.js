import React, { Component } from 'react';
import 'normalize.css';
import './App.scss';
import Home from './modules/Home.js';
import Remote from './modules/Remote.js'
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    let apiUrl;
    if (process.env.NODE_ENV === "development") {
      apiUrl = "http://localhost:3000";
    } else {
      apiUrl = window.location.hostname;
    }
    return (
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} apiUrl={apiUrl} />} />
          <Route path="/remote" render={(props) => <Remote {...props} apiUrl={apiUrl} />} />
        </Switch>
      </div>
    )
  }
}

export default App;