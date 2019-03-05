var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
const { google } = require('googleapis');
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
var cron = require('node-cron');
require('dotenv').config();

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

var io = app.io = require("socket.io")();

var display = {
  background: process.env.DEFAULT_IMAGE,
  opacity: "0"
};

io.on("connection", socket => {
  socket.emit("data", data);
  socket.emit("display", display);
});

setInterval(function () {
  io.emit("data", data);
}, 60000);

app.post('/api/display', function (req, res) {
  if (req.body.background) {
    display.background = req.body.background;
  }
  if (req.body.opacity) {
    display.opacity = req.body.opacity;
  }
  io.emit('display', display);
  res.send("OK");
});

app.post('/api/randomize-background', function (req, res) {
  request(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_CLIENT_ID}&query=` + req.body.q, function (error, response, body) {
    if (!error && body) {
      display.background = JSON.parse(body).urls.regular;
      io.emit('display', display);
      res.send("OK");
    }
  });
});

app.use(function catchError(req, res, next, err) {
  console.error('Caught error', err);
  res.status(500).json({
    error: err
  });
});

cron.schedule('0 7 * * *', () => {
  display.opacity = "0";
  io.emit("display", display);
}, {
  timezone: "America/New_York"
});

function getSubway(callback) {
  var decodedBody;
  var feeds = [
    {
      id: 31,
      stops: [
        {
          color: "#6CBE45",
          id: "G26N",
          station: "Court Square",
          line: "G",
          updates: []
        },
        {
          color: "#6CBE45",
          id: "G26S",
          station: "Church Ave.",
          line: "G",
          updates: []
        }
      ]
    }

  ]

  feeds.forEach(function (feed, feedIndex) {
    request({ url: `http://datamine.mta.info/mta_esi.php?key=${process.env.MTA_KEY}&feed_id=${feed.id}`, encoding: null }, function (error, response, body) {
      try {
        decodedBody = GtfsRealtimeBindings.FeedMessage.decode(body);
      } catch (e) {
        return;
      }

      feeds.forEach(function (feed) {
        if (decodedBody.entity) {
          decodedBody.entity.forEach(function (entity) {
            if (entity.trip_update) {
              entity.trip_update.stop_time_update.forEach(function (update) {
                feed.stops.forEach(function (stop, stopsIndex) {
                  if (stop.id === update.stop_id) {
                    feed.stops[stopsIndex].updates.push(update.arrival);
                  }
                });
              })
            }
          });
        }
      });
      callback({
        body: feeds,
        timestamp: Date.now()
      });
    });
  });
}

function getWeather(callback) {
  request(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${process.env.WEATHER_COORDINATES}?exclude=alerts,flags`, function (error, response, body) {
    if (body && !body.error) {
      callback({
        body: JSON.parse(body),
        timestamp: Date.now()
      });
    }
  });
}

function getCalendar(calendarId, callback) {
  var google_private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  let jwtClient = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT,
    null,
    google_private_key,
    ['https://www.googleapis.com/auth/calendar',]
  );

  jwtClient.authorize(function (err) {
    if (!err) {
      google.calendar("v3").events.list(
        {
          auth: jwtClient,
          calendarId: calendarId,
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: "startTime"
        },
        function (err, response) {
          if (response && !err) {
            callback({
              body: response.data,
              timestamp: Date.now()
            });
          }
        }
      );
    }
  });
}

function getFeed(callback) {
  // Get new token: https://feedly.com/v3/auth/dev
  request({
    url: `http://cloud.feedly.com/v3/streams/contents?streamId=user/${process.env.FEEDLY_USERID}/category/global.all`,
    headers: {
      Authorization: `OAuth ${process.env.FEEDLY_KEY}`
    }
  }, function (error, response, body) {
    if (response && !error && !JSON.parse(body).errorCode) {
      callback({
        body: JSON.parse(body),
        timestamp: Date.now()
      });
    }
  });
}

var data = {};

getSubway(function (response) {
  data.subway = response;
});

getAllData();

setInterval(function () {
  getAllData();
}, 1800000);

setInterval(function () {
  getSubway(function (response) {
    data.subway = response;
  });
}, 60000);

function getAllData() {
  getWeather(function (response) {
    data.weather = response;
  });
  getCalendar(process.env.CALENDAR_1, function (response) {
    data[`calendar-${process.env.CALENDAR_1}`] = response;
  });
  getCalendar(process.env.CALENDAR_2, function (response) {
    data[`calendar-${process.env.CALENDAR_2}`] = response;
  });
  getCalendar(process.env.CALENDAR_3, function (response) {
    data[`calendar-${process.env.CALENDAR_3}`] = response;
  });
  getFeed(function (response) {
    data.feed = response;
  });
}

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = app;