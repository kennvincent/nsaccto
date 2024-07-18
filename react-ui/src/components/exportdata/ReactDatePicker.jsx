import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const ReactDatePicker = () => {

    const [startDate, setStartDate] = useState(new Date());

    

  return (
    <div>
        <DatePicker 
             selected={startDate}
             onChange={setStartDate}
             dateFormat="dd/MM/yyyy"
          
             
        />
    </div>
  )
}

export default ReactDatePicker