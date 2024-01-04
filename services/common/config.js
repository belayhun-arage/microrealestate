const _ = require('lodash');
const logger = require('winston');

module.exports = {
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'debug',
  PRODUCTION: process.env.NODE_ENV === 'production',
  MONGO_URL:
    process.env.MONGO_URL ||
    process.env.BASE_DB_URL ||
    'mongodb://localhost:27017/mydatabase',
  REDIS_URL:
    process.env.REDIS_URL ||
    process.env.TOKEN_DB_URL ||
    'redis://localhost:6379',
  REDIS_PASSWORD:
    process.env.REDIS_PASSWORD || process.env.TOKEN_DB_PASSWORD || undefined,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET,
  CIPHER_KEY: process.env.CIPHER_KEY || '<Buffer 36 6a 63 2f 72 ce 34 17 38 a5 fb 95 50 8e 6e 5f d5 44 85 03 92 0e 2f 17 cc 76 e4 65 c3 4d 4e 17>',
  CIPHER_IV_KEY: process.env.CIPHER_IV_KEY || '<Buffer e3 a8 18 cb 1b 9a 13 e4 cf eb b1 93 f9 1f 7d 99>',
  log: function log() {
    const { log, ...config } = this;
    const escapedConfig = _.cloneDeep(config);
    escapedConfig.REDIS_PASSWORD = '****';
    escapedConfig.ACCESS_TOKEN_SECRET = '****';
    escapedConfig.REFRESH_TOKEN_SECRET = '****';
    escapedConfig.RESET_TOKEN_SECRET = '****';
    escapedConfig.CIPHER_KEY = '****';
    escapedConfig.CIPHER_IV_KEY = '****';
    if (escapedConfig.GMAIL?.appPassword) {
      escapedConfig.GMAIL.appPassword = '****';
    }
    if (escapedConfig.SMTP?.password) {
      escapedConfig.SMTP.password = '****';
    }
    if (escapedConfig.MAILGUN?.apiKey) {
      escapedConfig.MAILGUN.apiKey = '****';
    }
    logger.debug('Environment variables set:');
    Object.entries(escapedConfig)
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .reduce(
        (acc, [key, value]) => [...acc, `${key}: ${JSON.stringify(value)}`],
        []
      )
      .forEach((configLine) => logger.debug(configLine));
  },
};
