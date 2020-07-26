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
    const transactions = await TransactionModel.find({ yearMonth: period }).sort({ day: 1 });
    response.send(transactions);
  }
  catch (error) {
    response.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
  }
};





const addNew = async (request, response) => {
  const transaction = new TransactionModel({
    description: request.body.description,
    value: request.body.value,
    category: request.body.category,
    year: request.body.year,
    month: request.body.month,
    day: request.body.day,
    yearMonth: `${request.body.year}-${request.body.month.toString().padStart(2, '0')}`,
    yearMonthDay: `${request.body.year}-${request.body.month.toString().padStart(2, '0')}-${request.body.day.toString().padStart(2, '0')}`,
    type: request.body.type,
  })

  try {
    await transaction.save(transaction);
    response.send({ message: "Transação Inserida" });
  } catch (error) {
    response.status(500).send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }


};
const updateOne = async (request, response) => {
  const idToSearch = request.params.id;
  if (ObjectId.isValid(idToSearch)) {
    try {
      const transaction = await TransactionModel.findByIdAndUpdate(
        { _id: idToSearch },
        {
          description: request.body.description,
          value: request.body.value,
          category: request.body.category,
          year: request.body.year,
          month: request.body.month,
          day: request.body.day,
          yearMonth: `${request.body.year}-${request.body.month.toString().padStart(2, '0')}`,
          yearMonthDay: `${request.body.year}-${request.body.month.toString().padStart(2, '0')}-${request.body.day.toString().padStart(2, '0')}`,
          type: request.body.type,
        },
        { new: true }
      );
      if (!transaction) {
        response.status(404).send("transação não Encontrada");
      }
      else {
        response.send('Transação atualizada com sucesso');
      }
    } catch (error) {
      response.status(500).send(error);
    }
  }
  else {
    response.status(500).send('Erro ao atualizar transação');
  }
};
const deleteOne = async (request, response) => {
  const idToSearch = request.params.id;
  try {
    const transaction = await TransactionModel.findByIdAndRemove({ _id: idToSearch });
    if (!transaction) {
      response.status(404).send("transação não Encontrada");
    }
    else {
      response.send('Transação excluída com sucesso');
    }
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = { findPeriod, addNew, updateOne, deleteOne };
