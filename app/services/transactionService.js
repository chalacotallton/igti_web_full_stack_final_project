const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findPeriod = async (request, response) => {
  const period = request.query.period;
  try {
    const transactions = await TransactionModel.find({ yearMonth: period });
    console.log(transactions.length);
    response.send(transactions);
  }
  catch (error) {
    response.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
  }
};



const addNew = async (_request, response) => {
  await response.send({ message: "ok" });
};
const updateOne = async (_request, response) => {
  await response.send({ message: "ok" });
};
const deleteOne = async (_request, response) => {
  await response.send({ message: "ok" });
};

module.exports = { findPeriod, addNew, updateOne, deleteOne };
