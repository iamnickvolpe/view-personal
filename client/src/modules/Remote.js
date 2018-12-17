import React, { Component } from 'react';

class Remote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.changeImage = this.changeImage.bind(this);
        this.changeOpacity = this.changeOpacity.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeImage() {
        fetch(
            "/api/randomize-background", {
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({q: this.state.value})
            }
        ).then(function(response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    changeOpacity(opacity) {
        fetch(
            "/api/display", {
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({opacity: opacity})
            }
        ).then(function(response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    render() {
        return (
            <div>
                <h1>Remote</h1>
                <div>
                    <input type="text" placeholder="Search Images..." value={this.state.value} onChange={this.handleChange} />
                    <button onClick={this.changeImage}>Change Image</button>
                </div>
                <div>
                    <button onClick={() => this.changeOpacity("0")}>100%</button>
                    <button onClick={() => this.changeOpacity(".5")}>50%</button>
                    <button onClick={() => this.changeOpacity("1")}>0%</button>
                </div>
            </div>
        )
    }
}

export default Remote;