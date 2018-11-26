import React, { Component } from 'react';
import './Weather.css';
import io from "socket.io-client";
import _ from "lodash";
import moment from "moment";
import Moment from "react-moment";

class Weather extends Component {
    state = {
        weather: {},
        updated: "",
        icon: ""
    }
    socket = io('localhost:3000');

    componentDidMount() {
        var that = this;
        this.socket.on("data", function (data) {
            if(data.weather) {
                that.setState({ 
                    updated: data.weather.timestamp, 
                    icon: data.weather.body.currently.icon,
                    weather: data.weather.body
                });
            }
        });
    }

    render() {
        var temperature = "--";
        var now = "--"
        var apparentTemperature = "--";
        var dailyData = [];
        if (!_.isEmpty(this.state.weather)) {
            temperature = Math.round(this.state.weather.currently.temperature);
            apparentTemperature = Math.round(this.state.weather.currently.apparentTemperature);
            now = this.state.weather.minutely.summary;
            dailyData = this.state.weather.daily.data;
        }
        return (
            <div style={{ backgroundColor: this.props.color, backgroundImage: `url(https://source.unsplash.com/1600x900/?${this.state.icon})` }} className="module">
                {!_.isEmpty(this.state.weather) ? (
                    <div>
                        <div className="now">
                            <div><span className="temperature">{temperature}&deg;</span><span>Feels like {apparentTemperature}&deg;</span></div>
                            <div className="summary">{now}</div>
                        </div>

                        <div className="today">
                            <div className="today-header">Today</div>
                            <div className="today-temperature">{Math.round(dailyData[0].temperatureHigh)}&deg;/{Math.round(dailyData[0].temperatureLow)}&deg;</div>
                            <div className="today-summary">{dailyData[0].summary}</div>
                        </div>

                        <div className="today">
                            <div className="today-header">Tomorrow</div>
                            <div className="today-temperature">{Math.round(dailyData[1].temperatureHigh)}&deg;/{Math.round(dailyData[1].temperatureLow)}&deg;</div>
                            <div className="today-summary">{dailyData[1].summary}</div>
                        </div>

                        <div className="today">
                            <div className="today-header">{moment.unix(dailyData[2].time).format("dddd")}</div>
                            <div className="today-temperature">{Math.round(dailyData[2].temperatureHigh)}&deg;/{Math.round(dailyData[2].temperatureLow)}&deg;</div>
                            <div className="today-summary">{dailyData[2].summary}</div>
                        </div>



                        <p className="updated"><Moment fromNow>{this.state.updated}</Moment></p>
                    </div>
                ) : <div>Loading</div>}
            </div>
        );
    }
}

export default Weather;