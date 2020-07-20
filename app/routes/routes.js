const express = require('express');
const transactionRouter = express.Router();





transactionRouter.get("/", (request, response) => {

  if (!request.query.period) {
    response.send({
      error:
        'É necessário informar o parâmetro \"period\", cujo valor deve estar no formato yyyy-mm'
    })
  } else {
    response.send({
      message:
        `testando o res ${request.query.period}`
    });

  }
});


module.exports = transactionRouter;
