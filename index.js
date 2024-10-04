// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {

  let time;
  let date;
  if(req.params.date){
    if (req.params.date.match( /^[0-9]+$/g )){
      // is a number
      time = parseInt(req.params.date) 
      date = new Date(time)  
    }
    else{
      //is a date
      date = new Date(req.params.date)
      time = date.valueOf();
    }
  }
  else{
    date = new Date()
    time = date.valueOf();
  }
  if (date == "Invalid Date"){
    res.json({error: "Invalid Date"})
  }

  res.json({unix: time, utc: date.toUTCString()});
 
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
