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
          response = await axios.get('https://core.spreedly.com/v1/transactions.json?state=succeeded&count=100&order=desc', {auth: {username: config.SPREEDLY_ENV_KEY, password: config.SPREEDLY_ACCESS_SECRET}})
          return response.data.transactions.filter(transaction => transaction["transaction_type"] == "Purchase")
        } catch(e) {
          return e.response;
        }
    }
}

module.exports = TransactionService;