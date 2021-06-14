const express = require('express');
const TransactionRouter = express.Router();
// const PaymentService = require('../services/payment-service');
const jsonBodyParser = express.json();

TransactionRouter.post('/', jsonBodyParser, (req, res, next) => {
  const {token, user} = req.body;
  const db = req.app.get("db");
    console.log({token, user})
  res.send({token, user})
});

module.exports = TransactionRouter;