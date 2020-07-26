import React from 'react'
import http from './helper/http-common'



export default function Filter({ onFilterChange }) {

  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  }

  const add = async () => {
    const nat = document.getElementById("natureza").checked ? "-" : "+";
    const date = document.getElementById("date").value;
    const valor = parseInt(document.getElementById("valor").value);
    const categoria = document.getElementById("categoria").value;
    const descricao = document.getElementById("descricao").value;
    if (!descricao || !date || !categoria) {
      alert("Todas as entradas são necessárias!");
    } else if (!valor) {
      alert("O valor deve ser numérico");
    } else {
      let mes = date[0] + date[1] + date[2];
      const dia = date[4] + date[5];
      const ano = date[8] + date[9] + date[10] + date[11];
      if (mes === "Jan") mes = 1;
      if (mes === "Feb") mes = 2;
      if (mes === "Mar") mes = 3;
      if (mes === "Apr") mes = 4;
      if (mes === "May") mes = 5;
      if (mes === "Jun") mes = 6;
      if (mes === "Jul") mes = 7;
      if (mes === "Aug") mes = 8;
      if (mes === "Sep") mes = 9;
      if (mes === "Oct") mes = 10;
      if (mes === "Nov") mes = 11;
      if (mes === "Dec") mes = 12;
      const data = {
        "description": `${descricao}`,
        "value": valor,
        "category": `${categoria}`,
        "year": ano,
        "month": mes,
        "day": dia,
        "type": `${nat}`,
      }
      const res = await http.post(`/transaction`, data);
      if (res.status === 200) {
        console.log('here')
        didAdd(true);
      } else {
        didAdd(false);
        console.log('not here')
      }
    }
  };

  const didAdd = (val) => {
    if (val) {
      document.location.reload();
    }
    else {
      alert("Ocorreu um erro ao Processar sua entrada. Tente novamente!");
    }
  }

  return (
    <div>
      <div style={{ margin: "15px" }}>
        <button className="waves-effect waves-light btn modal-trigger" href="#modal1">+ Novo Registro</button>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <div className="row center">

              <div className="switch">
                <label>
                  Receita
                  <input id="natureza" type="checkbox"></input>
                  <span className="lever"></span>
                  <span style={{ color: "#26a69a" }}>
                    Despesa
                  </span>

                </label>
              </div>
            </div>
            <div className="row">
              <form className="col s12">
                <div className="row">
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <input placeholder="Categoria" id="categoria" type="text" className="validate" required></input>
                    <label htmlFor="categoria">Categoria</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="valor" type="text" className="validate"></input>
                    <label htmlFor="valor">Valor</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="descricao" type="text" className="validate" ></input>
                    <label htmlFor="descricao">Descrição</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="date" type="text" className="datepicker"></input>
                    <label htmlFor="date">Data</label>
                  </div>
                </div>

              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={add}>Adicionar</button>

          </div>
        </div>

      </div>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea id="textarea1" className="materialize-textarea" onChange={handleFilterChange}></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
