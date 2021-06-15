const express = require('express');
const TransactionRouter = express.Router();
const { submitPaymentToTestGateway, getTransactions } = require('../services/transactionService');

const jsonBodyParser = express.json();

TransactionRouter.post('/', jsonBodyParser, async (req, res, next) => {
  const {token, formData, amount, retain_on_success} = req.body;

  const response = await submitPaymentToTestGateway(token, amount, retain_on_success)

  console.log(response);
  
  if(response.status === 200) {
    res.json({message: "success"})
  } else if (response.status === 422) {
    res.status(400).json({error: "Card number invalid"})
  } else {
    res.status(400).json({error: "Something went wrong"})
  }
});

TransactionRouter.get('/transactions', async (req,res,next) => {
  const transactions = await getTransactions();
  res.json(transactions);
})

module.exports = TransactionRouter;