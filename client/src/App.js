import React, { Component } from 'react';
import 'normalize.css';
import './App.scss';
import Home from './modules/Home.js';
import Remote from './modules/Remote.js'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    let apiUrl;
    if (process.env.NODE_ENV === "development") {
      apiUrl = "http://localhost:3000";
    } else {
      apiUrl = window.location.hostname;
    }
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => <Home {...props} apiUrl={apiUrl} />} />
          <Route path="/remote" render={(props) => <Remote {...props} apiUrl={apiUrl} />}  />
        </div>
      </Router>
    )
  }
}

export default App;