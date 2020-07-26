import React from 'react'
import http from './helper/http-common'

export default function Transactions({ transactions, onDel }) {
  let lastEditClicked;
  const edit = (val) => {
    console.log(val.target.value);
    lastEditClicked = val.target.value;
    transactions.forEach(element => {
      if (element._id === val.target.value) {
        const a = document.getElementsByClassName("dateEdit");
        a[0].placeholder = 'Nova Data';
        const b = document.getElementsByClassName("valueEdit");
        b[0].value = element.value;
        const c = document.getElementsByClassName("categoryEdit");
        c[0].value = element.category;
        const d = document.getElementsByClassName("descriptionEdit");
        d[0].value = element.description;
      }
    });

  }
  const editconfirm = async () => {
    console.log(lastEditClicked);
    const a = document.getElementsByClassName("dateEdit");
    console.log(a[0].value);
    const date = a[0].value;
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
    const b = document.getElementsByClassName("valueEdit");
    console.log(parseInt(b[0].value));
    const c = document.getElementsByClassName("categoryEdit");
    console.log(c[0].value);
    const d = document.getElementsByClassName("descriptionEdit");
    console.log(d[0].value);
    let toEdit;
    transactions.forEach(element => {
      if (element._id === lastEditClicked) {
        toEdit = element;
      }
    });
    const data = {
      "description": `${d[0].value}`,
      "value": parseInt(b[0].value),
      "category": `${c[0].value}`,
      "year": ano,
      "month": mes,
      "day": dia,
      "type": `${toEdit.type}`,
    }
    console.log(data);
    const res = await http.patch(`/transaction/${lastEditClicked}`, data);
    if (res.status === 200) {
      console.log('here')
      didEdit(true);
    } else {
      didEdit(false);
      console.log('not here')
    }
  }

  const didEdit = (val) => {
    if (val) {
      alert("Entrada Editada com Sucesso!");
      document.location.reload();
    }
    else {
      alert("Ocorreu um erro ao Processar sua entrada. Tente novamente!");
    }
  }

  const deleteOne = async (val) => {

    const idToDel = val.target.value;
    console.log(idToDel);
    await http.delete(`/transaction/${idToDel}`);
    onDel(true);
  }


  let colour;
  return (
    <div>
      <div>
        {transactions.map((transaction) => {
          transaction.type === "-" ? colour = "#ffa8B6" : colour = "#51e2f5";
          return (
            <div key={transaction._id} style={{ backgroundColor: colour, padding: "2px", margin: "2px" }}>
              <div style={{ display: "inline-block", width: "10%", fontWeight: "bold" }}>{transaction.day}</div>
              <div style={{ display: "inline-block", width: "58%" }}>
                <span style={{ fontWeight: "bold" }}>{transaction.category}</span> <br></br>
                {transaction.description}
              </div>
              <div style={{ display: "inline-block", width: "20%" }}>R$ {transaction.value}</div>
              <div style={{ display: "inline-block", width: "12%" }}>
                <button className="waves-effect waves-light btn modal-trigger" href="#modal2" value={transaction._id} onClick={edit}>E!</button>







                <div id="modal2" className="modal">
                  <div className="modal-content">
                    <input type="text" className="categoryEdit" style={{ margin: "15px", marginLeft: "5px" }} />
                    <input type="text" className="valueEdit" style={{ margin: "15px", marginLeft: "5px" }} />
                    <input type="text" className="descriptionEdit" style={{ margin: "15px", marginLeft: "5px" }} />
                    <input type="text" className="datepicker dateEdit" style={{ margin: "15px", marginLeft: "5px" }} />
                  </div>
                  <div className="modal-footer">
                    <button href="#!" className="modal-close waves-effect waves-green btn" onClick={editconfirm}>Editar</button>
                  </div>
                </div>





                {<button value={transaction._id} type="button" className="waves-effect waves-light btn" onClick={deleteOne}>D!</button>}
              </div>
            </div>

          )
        })}
      </div>
    </div>
  )
}
