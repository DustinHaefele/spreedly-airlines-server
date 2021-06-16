const config = require('../config');
const axios = require('axios');

const TransactionService = {

    createTestGatewayBody(payment_token, amount, retain) {
        return {
            transaction: {
              payment_method_token: payment_token,
              amount: amount,
              currency_code: "USD",
              retain_on_success: retain
            }
          }
    },

    createTestReceiverBody(payment_method_token) {
      return {
        "delivery": {
          "payment_method_token": payment_method_token,
          "url": "https://spreedly-echo.herokuapp.com",
          "headers": "Content-Type: application/json",
          "body": "{ \"product_id\": \"916598\", \"card_number\": \"{{credit_card_number}}\" }"
        }
      }
    },

    async submitPaymentToTestGateway(token, amount, retain) {
        const reqBody = TransactionService.createTestGatewayBody(token, amount, retain);
        console.log(reqBody);
        let response = null;
        try {
          response = await axios.post(`https://core.spreedly.com/v1/gateways/${config.TEST_GATEWAY_TOKEN}/purchase.json`, reqBody,{auth: {username: config.SPREEDLY_ENV_KEY, password: config.SPREEDLY_ACCESS_SECRET}, headers: {'content-type': 'application/json'}})
          return response
        } catch(e) {
          return e.response;
        }

    },  

    async getTransactions() {
      let response = null;
        try {
          response = await axios.get('https://core.spreedly.com/v1/transactions.json?count=100&order=desc', {auth: {username: config.SPREEDLY_ENV_KEY, password: config.SPREEDLY_ACCESS_SECRET}})
          return response.data.transactions.filter(transaction => transaction["transaction_type"] == "Purchase")
        } catch(e) {
          return e.response;
        }
    },

    async submitPaymentToTestReciever(token) {
      const reqBody = TransactionService.createTestReceiverBody(token);
      try {
        response = await axios.post(`https://core.spreedly.com/v1/receivers/${config.TEST_RECEIVER_TOKEN}/deliver.json`, reqBody, {auth: {username: config.SPREEDLY_ENV_KEY, password: config.SPREEDLY_ACCESS_SECRET}, headers: {'content-type': 'application/json'}})
        return response
      } catch(e) {
        return e.response;
      }
  }
}

module.exports = TransactionService;