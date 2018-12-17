var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
const { google } = require('googleapis');
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
var cron = require('node-cron');

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

var io = app.io = require("socket.io")();

var display = {
  background: "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80",
  opacity: "0"
};

let interval;
io.on("connection", socket => {
  socket.emit("data", data);
  socket.emit("display", display);
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(function() {
    socket.emit("data", data);
  }, 60000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

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

app.post('/api/randomize-background', function(req, res) {
  request('https://api.unsplash.com/photos/random?client_id=3034609ca545d748050da849eda57325b149fdfe99bca1ec0861e9651d36cca0&query='+req.body.q, function (error, response, body) {
    if (!error && body) {
      display.background = JSON.parse(body).urls.full;
      io.emit('display', display);
      res.send("OK");
    }
  });
});

cron.schedule('0 7 * * *', () => {
  socket.emit("display", { opacity: "0" });
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
          station: "Greenpoint Ave. G Uptown",
          line: "G",
          updates: []
        },
        {
          color: "#6CBE45",
          id: "G26S",
          station: "Greenpoint Ave. G Downtown",
          line: "G",
          updates: []
        }
      ]
    }

  ]

  feeds.forEach(function (feed, feedIndex) {
    request({ url: `http://datamine.mta.info/mta_esi.php?key=bdcdc10d8115d730017e37cc7c6cd8fd&feed_id=${feed.id}`, encoding: null }, function (error, response, body) {
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
  request('https://api.darksky.net/forecast/54b93be758e0a2a2819376a8419dea32/40.7330999,-73.9577795?exclude=alerts,flags', function (error, response, body) {
    if (body && !body.error) {
      callback({
        body: JSON.parse(body),
        timestamp: Date.now()
      });
    }
  });
}

function getCalendar(calendarId, callback) {
  let jwtClient = new google.auth.JWT(
    "view-960@view-222722.iam.gserviceaccount.com",
    null,
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDcC0jGX8LMPWNk\nbsbJf37AdX8ypPkMIyRNOTOVcSMiy0zeqSCGjDa5WYlk3KiiV0voVQzSDyC8/DJt\n8jCrfsl8ww/5NTPlZfpe2kT0IWbdR61OC80G79x+odj3tITGEKcpss6tDAW6Po6O\nptsylLYWSxfRIiZ9s/6ZBWN90pvjcB+JOm+GqM+UQbEoZCZo5thpsQhsk9X8CEZT\nPsvpyYKO2ikHU5gd84v0MewZjU/Da/LgU9apuhbc0lCLb1SEqRw4vo2pbyMAmASD\nM+IOXpUUXtK7/9aB/iazA1/uhrBtR4QltkA4wPOa4PePwSRJ13HDnwpGLiDy/SFY\nf0/WzgNfAgMBAAECggEASunslNz1TON5ey/bra4iUROvgmZ4A5HTQhc/YJlsBOSB\n/yxFTold+CxrglM9dkeSKD8MZleQJccWxCe4OiqoHjmqroVWbbsSSki1QQg+JQfK\nENAjtUDkKJihbXOf4G66+o9NncyCBq5Vimt0JPxMIbrfGOwvfoxRGXekL6oMOJnJ\nuxcvbq9u2tlFQR1rf/izJ24aKCOhwBOZ6BLKKdyHdl7ZsEKQPFxhpNvowIrP89PQ\naPh89RtNb+V02GlZrKRUFM2jeAKc5dPlkola0FPGpIBDfXIhgm3CqBgiZbwbZ0Fq\naI5In0VPPlXhwOHj6QLXtDm69AWb00UR2jXU57FkQQKBgQD8K2LhHAs8nQAy/sQU\n1hcBrpv1nqo1NOOPbDJAVjhuPNM7cqbgA0s7LYcTveks4qxmbWC8NhevKdegvllt\nYrJmyM8HmDutq57ypqFdyJ7+1vwsqTyhezPN5vQN1By2plwtODtLKn+drGexq3g/\nIL04W/rzXOY8an6rhSR7XXuXgwKBgQDfYvjBSscXTLXJ3H3ewJEE5jV08nhWqVei\ne7GOddeO6uAZvdbYPiB9jg+/tRg+bibyR7Tk39nRCVHVAAybtHttdihWjCDzz/YX\n8As/9kZv3mVnClhgY/b9ZlNO0r5onqkMdsn5ZdiHjDNUIhvdDMD/OKDi5IBYRO1I\nZfIb0o+B9QKBgQC/QISg6K0ZDpY9Fv5OM0WFsBF3CxxaeD9y4oOGSh5IdXdbagxo\nb/cZ7eC5t1pnAY/xq1knxfrWjeyNbHDUxns5+2kRgIMap8RIktpmD6eO7iyaDsz+\nSDu1GUnWRx5z5N6aKUDHNHdPdZe7p6nubv00BobhFn9EKRzjJ3rQ2cjH0wKBgHQo\nJK1t0sSc0NJcYt8XRtFDW3yqMETv3W/R3evz/tiD7W+1NShQddiTrEDFTAv6fynw\ne3GfrMVzkSeu1N+KI7wxepw2VVQySQb9fPwPdWTqQdQonvfQQzhUovETyIriJYkj\no7aZbNRe5LnU2qRA44JS0eXpZ4t+m9vPlus8u/6ZAoGBAPdrJu2qhzgffeP0uXYS\nuP8udHby6ovHuqDSU/9YR67WTur7fIiUxDZvdv94wHHV3cAHkdzKZKNNfLGI9lXZ\nCiccrb3qZI2ZyY3eXF1Wp7mLU64Q+9Q4Xpz+uAZUmP93fA/dviVuQ74Ius753vea\n7AUY0CRr10HfNK7Sjel4zbrT\n-----END PRIVATE KEY-----\n",
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
    url: "http://cloud.feedly.com/v3/streams/contents?streamId=user/8f218b41-7fae-402b-b813-ff52f256c980/category/global.all",
    headers: {
      Authorization: "OAuth Az6cts9-miYyY3Vno96l74kLrb-sMWRmfB2WvxH9wCUBUhhJuuo9J_WYtk9SL67DXHT0B4I8JuygkRJxQBHsD3b0gyKGcH2b8EsG2fwkQSlMy3Nqo7CZieIIodAu6BSt09AeerOCPKMMQOP-XY_HPjQJOWPRKIdIr8Wx8htD8fG11noYBs3L5gDNXI_WKZa8G-G3fTcLKZ8aYWKYN36AmYoz13YMEJ_pDLwTeyIUNWT3tfR6cJbQxrn9Y2-T:feedlydev"
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
  getCalendar("7afrbvotf8p1qcjcpbqp2639as@group.calendar.google.com", function (response) {
    data["calendar-7afrbvotf8p1qcjcpbqp2639as@group.calendar.google.com"] = response;
  });
  getCalendar("nick@iamnickvolpe.com", function (response) {
    data["calendar-nick@iamnickvolpe.com"] = response;
  });
  getCalendar("jenn.sager@gmail.com", function (response) {
    data["calendar-jenn.sager@gmail.com"] = response;
  });
  getFeed(function (response) {
    data.feed = response;
  });
}

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;