import React, { Component } from 'react';
import Moment from "react-moment";
import './Time.scss';

class Time extends Component {
  render() {
    return (
      <div style={{ backgroundImage: `url(${this.props.image})`, backgroundColor: this.props.color }} className="module time">
        <div className="content">
          <div className="time">
            <Moment format="h:mm" /><span className="ampm"><Moment format="A" /></span>
          </div>
          <div className="date">
            <Moment format="dddd, MMMM Do" />
          </div>
        </div>
      </div>
    );
  }
}

export default Time;