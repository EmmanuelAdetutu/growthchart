const fs = require('fs');
const readline = require('readline');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });
const ddb = new AWS.DynamoDB.DocumentClient();


async function putDataToDynamo(item) {
    try {
        const params = {
            TableName: process.env.plantsTable,
            Item: item
        };
        await ddb.put(params).promise();

    }
    catch (error) {
        console.log(error)
    }

}
 function importfromCSV() {

    const rl = readline.createInterface({
        input: fs.createReadStream('./growthdata.csv'),
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        const dataToload = line.split(',');
        const newDate = Date.now();
        const plantData = {
            plantId:`test_${newDate}`,
            seedlingId: dataToload[0],
            periodData: {
                "period": dataToload[1]
            },
            plantData: {
                plantHeight: parseInt(dataToload[2]),
                leafArea: parseInt(dataToload[3]),
                leafNo: parseInt(dataToload[4])
            }
        }
        putDataToDynamo(plantData)
        console.log(plantData);
    });
}
module.exports={
    importfromCSV
}