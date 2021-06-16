const express = require('express');
const TransactionRouter = express.Router();
const { submitPaymentToTestGateway, getTransactions, submitPaymentToTestReciever } = require('../services/transactionService');

const jsonBodyParser = express.json();

TransactionRouter.post('/', jsonBodyParser, async (req, res, next) => {
  const {token, amount, retain_on_success} = req.body;

  const response = await submitPaymentToTestGateway(token, amount, retain_on_success)

  console.log(response);
  
  if(response.status === 200) {
    res.json({message: "success"})
  } else if (response.status === 422) {
    res.status(400).json({error: "Card invalid"})
  } else {
    res.status(400).json({error: "Something went wrong"})
  }
});

TransactionRouter.post('/receiver', jsonBodyParser, async (req,res,next) =>{
  const {token, product_id} = req.body;

  const response = await submitPaymentToTestReciever(token, product_id);

  if(response.status === 200) {
    res.json({message: "success"})
  } else if (response.status === 422) {
    console.log(response);
    res.status(400).json({error: "Card invalid"})
  } else {
    console.log(response);
    res.status(400).json({error: "Something went wrong"})
  }
})

TransactionRouter.get('/transactions', async (req,res,next) => {
  const transactions = await getTransactions();
  res.json(transactions);
})

module.exports = TransactionRouter;