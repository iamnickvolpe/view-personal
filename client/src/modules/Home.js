import React, { Component } from 'react';
import './Home.scss';
import Weather from './Weather.js';
import Time from './Time.js';
import Calendar from './Calendar.js';
import Feed from './Feed.js';
import Subway from './Subway.js';

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
        this.props.socket.on("display", function (data) {
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
                    <Time color="rgba(0, 0, 0, 0.35)" />
                    <Calendar socket={this.props.socket} color="rgb(121, 112, 255)" calendar="7afrbvotf8p1qcjcpbqp2639as@group.calendar.google.com" />
                    <Calendar socket={this.props.socket} color="rgb(253, 147, 72)" calendar="iamnickvolpe@gmail.com" />
                    <Calendar socket={this.props.socket} color="rgb(210, 102, 255)" calendar="jenn.sager@gmail.com" />
                    <Weather socket={this.props.socket} color="rgba(0, 0, 0, 0.35)" />
                    <Subway socket={this.props.socket} color="rgba(0, 0, 0, 0.35)" />
                    <Feed socket={this.props.socket} color="white" />
                </div>
                {/*<div className="cover" style={{ opacity: this.state.opacity }}></div>*/}
            </div>
        )
    }
}

export default Home;