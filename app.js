var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { putDataToDynamo } = require('./apputils');
// const e = require('express');

app.use(bodyParser.json())
app.get('/growthchart/plant', function (req, res) {
  res.send({
    "Output": "Hello From Gorgeous Backend! (Get Data Acknowledge3)!"
  });
});
app.post('/growthchart/plant', async function (req, res) {
  console.log(req.body)
  const resFromPut = await putDataToDynamo(req.body)
  if (resFromPut === "OK") {
    res.statusCode = 200;
    res.send('Success plant data stored. ');
  } else {
    res.statusCode = 500;
    res.send('Failed plant data not stored');
  }

});
// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
