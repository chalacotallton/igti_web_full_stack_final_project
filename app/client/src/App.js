import React from 'react';
import Selector from './components/Selector';
import Details from './components/Details';
import Filter from './components/Filter';
import Transactions from './components/Transactions';
import PERIODS from './components/helper/periods';


export default function App() {
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  const [transactions, setTransactions] = React.useState([]);
  const [filterString, setFilterString] = React.useState("");

  const handleSelectChange = (event) => {
    const newPeriod = event;
    setCurrentPeriod(newPeriod);
  }



  const filter = (event) => {
    const filtro = event;
    setFilterString(filtro);
    const newTransactions = [];
    const fetchPeriods = async () => {
      const url = 'http://localhost:3001/api/transaction';
      const periodUrl = `${url}?period=${currentPeriod}`;
      const resource = await fetch(periodUrl);
      const json = await resource.json();
      json.forEach(element => {
        if (element.description.toLowerCase().includes(filtro.toLowerCase())) {
          newTransactions.push(element);
        }
      });
      setTransactions(newTransactions);
    };
    fetchPeriods();
  }

  const handleDel = () => {
    const fetchPeriods = async () => {
      filter(filterString);
    };
    fetchPeriods();
  }



  React.useEffect(() => {
    const fetchPeriods = async () => {
      const url = 'http://localhost:3001/api/transaction';
      const periodUrl = `${url}?period=${currentPeriod}`;
      const resource = await fetch(periodUrl);
      const json = await resource.json();
      setTransactions(json);
    };
    fetchPeriods();
  }, [currentPeriod])

  return (
    <div className="container">
      <h2 className="center">Desafio Final do Bootcamp Full Stack</h2>
      <h3 className="center">Controle Financeiro Pessoal</h3>

      <Selector onFormChange={handleSelectChange} />
      <Details transactions={transactions} />
      <Filter onFilterChange={filter} />
      <Transactions transactions={transactions} onDel={handleDel} />
      <hr />
      <div style={{ height: "20px" }}></div>
    </div>
  );
}
