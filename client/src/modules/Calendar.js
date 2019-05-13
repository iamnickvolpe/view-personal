import React, { Component } from 'react';
import './Calendar.scss';
import _ from "lodash";
import Moment from "react-moment";
import moment from "moment";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendar: {},
            updated: ""
        }
    }

        
    componentDidMount() {
        this.setState({
            calendar: this.props.data.body,
            updated: this.props.data.timestamp
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            calendar: props.data.body,
            updated: props.data.timestamp
        })
    }
    

    render() {
        if (!_.isEmpty(this.state.calendar)) {
            var calendarItems = this.state.calendar.items;
            var todaysEvents = [];
            var tomorrowsEvents = [];
            var otherEvents = [];
            calendarItems.forEach(function (item, index) {
                if (item.start.dateTime) {
                    calendarItems[index].friendlyTime = moment(item.start.dateTime).format("h:mma");
                    calendarItems[index].day = moment(item.start.dateTime).format("YYYY-MM-DD");
                } else if (item.start.date) {
                    calendarItems[index].friendlyTime = "All day";
                    calendarItems[index].day = moment(item.start.date).format("YYYY-MM-DD");
                }
                if (moment().format("YYYY-MM-DD") === calendarItems[index].day) {
                    todaysEvents.push(item);
                } else if (moment().add(1, 'days').format("YYYY-MM-DD") === calendarItems[index].day) {
                    tomorrowsEvents.push(item);
                } else {
                    otherEvents.push(item);
                }
            });
        }
        return (
            <div style={{ backgroundColor: this.props.color }} className="module calendar">
                {!_.isEmpty(this.state.calendar) ? (
                    <div>
                        <h1 className="calendar-name">{this.state.calendar.summary}</h1>

                        {todaysEvents.length ? (
                            <div className="group">
                                <h2 className="group-name">Today</h2>
                                {todaysEvents.map(item =>
                                    <div className="event" key={item.id}>
                                        <p className="time">{item.friendlyTime}</p> <p className="summary">{item.summary}</p>
                                    </div>
                                )}
                            </div>
                        ) : null}

                        {tomorrowsEvents.length ? (
                            <div className="group">
                                <h2 className="group-name">Tomorrow</h2>
                                {tomorrowsEvents.map(item =>
                                    <div className="event" key={item.id}>
                                        <p className="time">{item.friendlyTime}</p> <p className="summary">{item.summary}</p>
                                    </div>
                                )}
                            </div>
                        ) : null}

                        {otherEvents.length ? (
                            <div className="group">
                                <h2 className="group-name">2+ Days From Now</h2>
                                {otherEvents.map(item =>
                                    <div className="event" key={item.id}>
                                        <p className="time"><Moment format="M/D">{item.day}</Moment></p> <p className="summary">{item.summary}</p>
                                    </div>
                                )}
                            </div>
                        ) : null}

                        {!calendarItems.length ? (
                            <div className="none">No events</div>
                        ): null}

                        <p className="updated"><Moment fromNow>{this.state.updated}</Moment></p>
                    </div>
                ) : <div>Loading</div>}
            </div>
        );
    }
}

export default Calendar;