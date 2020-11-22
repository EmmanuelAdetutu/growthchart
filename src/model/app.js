var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const { putDataToDynamo } = require('./dataToDynamo');


app.use(bodyParser.json())

app.get('/growthchart/plant', function (req, res) {
  res.send({
    "Output": "Hello From Gorgeous Backend! (Get Data Acknowledge3)!"
  });
});
app.post('/growthchart/plant', function (req, res) {
  putDataToDynamo(req, res)
});
// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
