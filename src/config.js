module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  TEST_GATEWAY_TOKEN: process.env.TEST_GATEWAY_TOKEN,
  TEST_RECEIVER_TOKEN: process.env.TEST_RECEIVER_TOKEN,
  SPREEDLY_ENV_KEY: process.env.SPREEDLY_ENV_KEY,
  SPREEDLY_ACCESS_SECRET: process.env.SPREEDLY_ACCESS_SECRET
};