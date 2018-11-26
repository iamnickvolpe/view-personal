import React, { Component } from 'react';
import './Calendar.scss';
import _ from "lodash";
import Moment from "react-moment";
import moment from "moment";

class Subway extends Component {
    state = {
        subway: {},
        updated: ""
    }

    componentDidMount() {
        var that = this;
        this.props.socket.on("data", function (data) {
            if (data.subway) {
                that.setState({
                    subway: data.subway.body,
                    updated: data.subway.timestamp
                });
            }
        });
    }

    render() {
        if (!_.isEmpty(this.state.subway)) {
            var subway = this.state.subway;
            var stops = [];
            subway.forEach(function (line) {
                line.stops.forEach(function (stop) {
                    stops.push(stop);
                })
            });
        }
        return (
            <div style={{ backgroundColor: this.props.color }} className="module subway">
                {!_.isEmpty(this.state.subway) ? (
                    <div>
                        {stops.map((stop, index) =>
                            <div key={index}>
                                <div>{stop.station}</div>
                                {stop.updates.map((update, index) =>
                                    <div key={index}>{moment(update.time.low * 1000).fromNow()}</div>
                                )}
                            </div>
                        )}
                        <p className="updated"><Moment fromNow>{this.state.updated}</Moment></p>
                    </div>
                ) : <div>Loading</div>}
            </div>
        );
    }
}

export default Subway;