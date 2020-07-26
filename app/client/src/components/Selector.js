import React from 'react';
import PERIODS from './helper/periods';
import M from 'materialize-css'

export default function Selector({ onFormChange }) {

  React.useEffect(() => {
    M.AutoInit();
  })
  const handleChangesInForm = (val) => {
    onFormChange(val.target.value);
  }

  const periods = PERIODS;



  return (
    <div>
      <select onChange={handleChangesInForm}>
        {periods.map(period => {
          return <option key={period}>{period}</option>
        })}
      </select>
    </div>
  )
}
