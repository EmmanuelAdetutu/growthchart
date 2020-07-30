const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

async function putDataToDynamo(reqBody) {
    const params = {
        TableName: process.env.plantsTable,
        Item: {
          plantId: reqBody.plantid,
          plantHeight: reqBody.plantHeight,
          leaveCount:reqBody.leaveCount
        }
      };
      try {
        const result = await ddb.put(params).promise();
        return result.$response.data.$response.httpResponse.statusMessage;
      } catch (error) {
        console.log(error)
        return("Fail")
      }
}

module.exports={
    putDataToDynamo
}