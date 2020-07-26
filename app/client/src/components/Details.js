import React from 'react'

export default function Details({ transactions }) {
  const receitas = transactions.reduce(function (acc, val) {
    if (val.type === "+") {
      return acc + val.value;
    }
    else {
      return acc + 0;
    }
  }, 0);
  const despesas = transactions.reduce(function (acc, val) {
    if (val.type === "-") {
      return acc + val.value;
    }
    else {
      return acc + 0;
    }
  }, 0);
  return (
    <div style={{ border: "1px solid" }}>
      <div style={{ width: "25%", display: "inline-block" }}>Lançamentos: {transactions.length}</div>
      <div style={{ width: "25%", display: "inline-block" }}>Receitas: R$ {receitas}</div>
      <div style={{ width: "25%", display: "inline-block" }}>Despesas: R$ {despesas}</div>
      <div style={{ width: "25%", display: "inline-block" }}>Saldo: R$ {receitas - despesas}</div>
    </div>
  )
}
