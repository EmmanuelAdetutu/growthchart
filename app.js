var express = require('express');
var app = express();

app.get('/growthchart/plant', function(req, res) {
  res.send({
    "Output": "Hello From Gorgeous Backend! (Get Data Acknowledge)"
  });
});

app.post('/growthchart/plant', function(req, res) {
  res.send({
    "Output": "Hello From Gorgeous Backend! (Post Data Acknowledge)!"
  });
});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
