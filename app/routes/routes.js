const express = require('express');
const transactionRouter = express.Router();
const TransactionService = require('../services/transactionService');


transactionRouter.get('/', TransactionService.findPeriod);
transactionRouter.post('/', TransactionService.addNew);
transactionRouter.put('/', TransactionService.updateOne);
transactionRouter.delete('/', TransactionService.deleteOne);

module.exports = transactionRouter;
