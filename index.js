// index.js
// where your node app starts

// init project
const bodyParser = require("body-parser");
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

app.get("/api/:date?", (req, res) => {
  let message = {error : "Invalid Date"};

  if(req.params.date){
    let parsedDate;

    if(/\d{5,}/.test(req.params.date)){
      parsedDate = new Date(parseInt(req.params.date));
      message = {"unix": Date.parse(parsedDate), "utc": parsedDate.toGMTString()};
    }else{
      parsedDate = Date.parse(req.params.date);
      
      if (isNaN(parsedDate) === false) {
        message = {"unix": parsedDate, "utc": new Date(parsedDate).toGMTString()};
      }
    }
  }else{
    message = {"unix": Date.now(), "utc": new Date().toGMTString()};
  }
  
  res.json(message);
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
