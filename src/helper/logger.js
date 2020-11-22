const winston = require('winston');

exports.logger = winston.createLogger({
  level: process.env.loglevel || 'info',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format((info) => {
      // Put the duration produced from logger.profile inside the message object
      if (info.durationMs && info.message && info.level === 'info') {
        // eslint-disable-next-line no-param-reassign
        info.message.durationMs = info.durationMs;
        // eslint-disable-next-line no-param-reassign
        delete info.durationMs;
      }
      // eslint-disable-next-line no-param-reassign
      info.lambdaRequestId = global.lambdaRequestId;
      // eslint-disable-next-line no-param-reassign
      info.apiGatewayRequestId = global.apiGatewayRequestId;
      return info;
    })(),
    winston.format.timestamp(),
    winston.format.json(),
  ),
});
