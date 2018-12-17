import React, { Component } from 'react';
import './Weather.scss';
import _ from "lodash";
import moment from "moment";
import Moment from "react-moment";
import io from "socket.io-client";

class Weather extends Component {
    state = {
        weather: {},
        updated: "",
        icon: ""
    }

    componentDidMount() {
        var that = this;
        io(this.props.apiUrl).on("data", function (data) {
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
            <div style={{ backgroundColor: this.props.color }} className="weather module">
                {!_.isEmpty(this.state.weather) ? (
                    <div>
                        <div className="now">
                            <div><span className="temperature">{temperature}&deg;</span><span>Feels like {apparentTemperature}&deg;</span></div>
                            <div className="summary">{now}</div>
                        </div>

                        <div className="day">
                            <h2 className="group-name">Today H{Math.round(dailyData[0].temperatureHigh)}&deg; L{Math.round(dailyData[0].temperatureLow)}&deg;</h2>
                            <div className="day-summary">{dailyData[0].summary}</div>
                        </div>

                        <div className="day">
                            <h2 className="group-name">Tomorrow H{Math.round(dailyData[1].temperatureHigh)}&deg; L{Math.round(dailyData[1].temperatureLow)}&deg;</h2>
                            <div className="day-summary">{dailyData[1].summary}</div>
                        </div>

                        <div className="day">
                            <h2 className="group-name">{moment.unix(dailyData[2].time).format("dddd")} H{Math.round(dailyData[2].temperatureHigh)}&deg; L{Math.round(dailyData[2].temperatureLow)}&deg;</h2>
                            <div className="day-summary">{dailyData[2].summary}</div>
                        </div>



                        <p className="updated"><Moment fromNow>{this.state.updated}</Moment></p>
                    </div>
                ) : <div>Loading</div>}
            </div>
        );
    }
}

export default Weather;