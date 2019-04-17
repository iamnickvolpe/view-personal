import React, { Component } from 'react';
import Moment from "react-moment";
import './Time.scss';

class Time extends Component {
  componentDidMount() {
    var that = this;
    var canvas = this.refs.canvas;
    
    drawClock();

    function drawClock() {
      var width = that.refs.clockWrapper.clientWidth * .8;
      canvas.width = width * 2;
      canvas.height = width * 2;
      canvas.style.width = width + "px";
      canvas.style.height = width + "px";
      const ctx = that.refs.canvas.getContext('2d');
      var radius = canvas.height / 4;
      ctx.scale(2, 2);
      ctx.translate(radius, radius);
      radius = radius * 0.8;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNumbers(ctx, radius);
      drawSeasons(ctx, radius);
      drawTime(ctx, radius);
    }

    setInterval(function () {
      drawClock();
    }, 1000);

    function drawNumbers(ctx, radius) {
      var ang;
      ctx.font = radius * 0.15 + "px arial";
      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      var months = [
        "Jan",
        "•",
        "•",
        "Apr",
        "•",
        "•",
        "Jul",
        "•",
        "•",
        "Oct",
        "•",
        "•"
      ];
      months.forEach(function (month, num) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.75);
        ctx.rotate(-ang);
        ctx.fillText(month, 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.75);
        ctx.rotate(-ang);
      });
    }

    function getPosition(ms) {
      var now = new Date();
      var yearStartMS = new Date(now.getFullYear(), 0, 1).getTime();
      var yearEndMS = new Date(now.getFullYear(), 11, 31).getTime();

      var totalDistanceMS = yearEndMS - yearStartMS;
      var totalDistanceRadians = 2 * Math.PI;

      var distanceMS = ms - yearStartMS;

      var distanceRatio = distanceMS / totalDistanceMS;

      return totalDistanceRadians * distanceRatio - (.5 * Math.PI);
    }

    function drawSeasons(ctx, radius) {
      var now = new Date();
      var winterStartMS = new Date(now.getFullYear() - 1, 11, 21).getTime();
      var winterEndMS = new Date(now.getFullYear(), 2, 20).getTime();

      var springStartMS = new Date(now.getFullYear(), 2, 20).getTime();
      var springEndMS = new Date(now.getFullYear(), 5, 21).getTime();

      var summerStartMS = new Date(now.getFullYear(), 5, 21).getTime();
      var summerEndMS = new Date(now.getFullYear(), 8, 23).getTime();

      var fallStartMS = new Date(now.getFullYear(), 8, 23).getTime();
      var fallEndMS = new Date(now.getFullYear() - 1, 11, 21).getTime();

      ctx.beginPath();
      ctx.strokeStyle = "#8FE4FF";
      ctx.lineWidth = radius * 0.06;
      ctx.arc(0, 0, radius, getPosition(winterStartMS), getPosition(winterEndMS) - 0.05);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "#BCFF79";
      ctx.lineWidth = radius * 0.06;
      ctx.arc(0, 0, radius, getPosition(springStartMS), getPosition(springEndMS) - 0.05);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "#FFED48";
      ctx.lineWidth = radius * 0.06;
      ctx.arc(0, 0, radius, getPosition(summerStartMS), getPosition(summerEndMS) - 0.05);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "#FFBC7E";
      ctx.lineWidth = radius * 0.06;
      ctx.arc(0, 0, radius, getPosition(fallStartMS), getPosition(fallEndMS) - 0.05);
      ctx.stroke();
      ctx.closePath();
    }

    function drawTime(ctx, radius) {
      var now = new Date();
      var nowMS = now.getTime();

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = radius * 0.02;
      ctx.lineCap = "round";
      ctx.moveTo(0, 0);
      ctx.rotate(getPosition(nowMS) + (.5 * Math.PI));
      ctx.lineTo(0, -radius * 0.9);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
      ctx.rotate(-(getPosition(nowMS) + (.5 * Math.PI)));
      ctx.lineCap = "square";
      ctx.lineWidth = radius * 0.06;
      ctx.arc(0, 0, radius, getPosition(new Date(now.getFullYear(), 0, 1).getTime()), getPosition(nowMS));
      ctx.stroke();
      ctx.closePath();
    }
  }

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

          <div ref="clockWrapper" className="clock">
            <canvas ref="canvas"></canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default Time;