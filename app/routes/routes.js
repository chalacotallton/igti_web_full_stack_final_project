const express = require('express');
const transactionRouter = express.Router();
const TransactionService = require('../services/transactionService');


transactionRouter.get('/', TransactionService.findPeriod);
transactionRouter.post('/', TransactionService.addNew);
transactionRouter.patch('/:id', TransactionService.updateOne);
transactionRouter.delete('/:id', TransactionService.deleteOne);

module.exports = transactionRouter;
