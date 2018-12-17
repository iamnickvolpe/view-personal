import React, { Component } from 'react';
import './Home.scss';
import Weather from './Weather.js';
import Time from './Time.js';
import Calendar from './Calendar.js';
import Feed from './Feed.js';
import Subway from './Subway.js';
import io from "socket.io-client";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: "",
            opacity: ""
        }
    }

    componentDidMount() {
        var that = this;
        io(this.props.apiUrl).on("display", function (data) {
            if (data.background) {
                that.setState({ background: data.background });
            }
            if (data.opacity) {
                that.setState({ opacity: data.opacity });
            }
        });
    }

    render() {
        return (
            <div>
                <div className="cards" style={{ backgroundImage: `url(${this.state.background})` }}>
                    <Time color="rgba(0, 0, 0, 0.25)" />
                    <Calendar apiUrl={this.props.apiUrl} color="rgb(121, 112, 255)" calendar="7afrbvotf8p1qcjcpbqp2639as@group.calendar.google.com" />
                    <Calendar apiUrl={this.props.apiUrl} color="rgb(253, 147, 72)" calendar="nick@iamnickvolpe.com" />
                    <Calendar apiUrl={this.props.apiUrl} color="rgb(210, 102, 255)" calendar="jenn.sager@gmail.com" />
                    <Weather apiUrl={this.props.apiUrl} color="rgba(0, 0, 0, 0.25)" />
                    <Subway apiUrl={this.props.apiUrl} color="rgba(0, 0, 0, 0.25)" />
                    <Feed apiUrl={this.props.apiUrl} color="white" />
                </div>
                <div className="cover" style={{ opacity: this.state.opacity }}></div>
            </div>
        )
    }
}

export default Home;