
const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

async function putDataToDynamo(req, res) {
  try {
    const params = {
      TableName: process.env.plantsTable,
      Item: {
        plantId: req.body.plantid,
        plantHeight: req.body.plantHeight,
        leaveCount: req.body.leaveCount
      }
    };
    await ddb.put(params).promise();
    logger.info({
      type: 'Success',
      operation: 'put-Data-To-Dynamo',
      reqBody: req.body
    });
    res.statusCode = 200;
    res.send('Success plant data stored. ');

  } catch (error) {
    logger.error({
      type: 'Failure',
      operation: 'put-Data-To-Dynamo',
      reqBody: req.body,
      error: {
        message: error.message ? error.message : JSON.stringify(error),
        stack: error.stack || error.stackTrace,
      }
    });
    res.statusCode = 500;
    res.send('Failed plant data not stored');
  }
}

module.exports = {
  putDataToDynamo
}