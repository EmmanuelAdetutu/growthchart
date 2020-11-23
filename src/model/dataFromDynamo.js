
const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });
const ddb = new AWS.DynamoDB.DocumentClient();
const {logger}=require('../helper/logger')

async function getDataFromDynamo(req, res) {
  try {
    var params = {
      TableName: process.env.plantsTable,
      ReturnConsumedCapacity: "TOTAL"
    };
    let scanResults = [];
    let items;

    items = await ddb.scan(params).promise();
    const array = items.Items
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      scanResults.push(element);
    }
    logger.info({
      type: 'Success',
      operation: 'get-Data-From-Dynamo',
      reqBody: req.body
    });
    res.statusCode = 200;
    res.send(scanResults);

  } catch (error) {
    logger.error({
      type: 'Failure',
      operation: 'get-Data-From-Dynamo',
      reqBody: req.body,
      error: {
        message: error.message ? error.message : JSON.stringify(error),
        stack: error.stack || error.stackTrace,
      }
    });
    res.statusCode = 500;
    res.send('Failed to get plants data !!');
  }
}

module.exports = {
  getDataFromDynamo
}