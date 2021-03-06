import React, { Component } from 'react';
import './Feed.scss';
import _ from "lodash";
import Slider from 'react-slick';
import Moment from 'react-moment';

class Feed extends Component {
    state = {
        feed: {},
        updated: ""
    }

    componentDidMount() {
        var that = this;
        this.props.socket.on("data", function (data) {
            if (data.feed) {
                that.setState({
                    updated: data.feed.timestamp,
                    feed: data.feed.body
                });
            }
        });
        this.createMarkup = this.createMarkup.bind(this);
    }

    createMarkup(markup) {
        if (markup) {
            return { __html: markup };
        }
    }

    render() {
        var feedItems = [];
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 15000,
            autoplay: true
        };
        if (!_.isEmpty(this.state.feed)) {
            feedItems = this.state.feed.items;
        }
        return (
            <div style={{ backgroundColor: this.props.color }} className="module feed">
                {!_.isEmpty(this.state.feed) ? (
                    <div>
                        <Slider {...settings}>
                            {feedItems.map(item =>
                                <div key={item.id}>
                                    {item.visual && item.visual.url !== "none" ? (
                                        <div className="image" style={{ backgroundImage: `url(${item.visual.url})` }}></div>
                                    ) : (null)}
                                    <div className="content">
                                        <h1 className="title">{item.title}</h1>
                                        <p className="published">{item.origin.title} &bull; <Moment fromNow>{item.published}</Moment></p>
                                        <p className="summary" dangerouslySetInnerHTML={this.createMarkup(item.summary ? (item.summary.content) : null)}></p>
                                    </div>
                                </div>
                            )}
                        </Slider>
                        <p className="updated"><Moment fromNow>{this.state.updated}</Moment></p>
                    </div>
                ) : <div>Loading</div>}
            </div>
        );
    }
}

export default Feed;