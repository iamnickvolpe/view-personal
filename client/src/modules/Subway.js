import React, { Component } from 'react';
import './Subway.scss';
import _ from "lodash";
import Moment from "react-moment";
import moment from "moment";
import io from "socket.io-client";

class Subway extends Component {
    state = {
        subway: {},
        updated: ""
    }

    componentDidMount() {
        var that = this;
        io(this.props.apiUrl).on("data", function (data) {
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
                            <div className="stop" key={index}>
                                <div>
                                    <div className={"line-" + stop.line}>{stop.line}</div>
                                </div>
                                
                                <div>
                                    <h2 className="group-name">{stop.station}</h2>
                                    {stop.updates.map((update, index) =>
                                        <div className="update" key={index}>
                                            {moment(update.time.low * 1000).fromNow()}
                                        </div>
                                    )}
                                    {!stop.updates.length ? (
                                        <div className="update">No trains</div>
                                    ): null}
                                </div>
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