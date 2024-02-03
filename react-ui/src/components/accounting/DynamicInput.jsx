import React from 'react'
import { useState } from 'react'

export default function DynamicInput() {
    const [inputFields, setInputFields] = useState([
        { accountcode: '', amount: '' }
      ])

      const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
      }

      const addFields = (e) => {
        e.preventDefault();
        let newfield = { accountcode: '', accountcode: '' }
    
        setInputFields([...inputFields, newfield])
        }
     
    const submit=(e)=>{
        e.preventDefault();
        console.log(inputFields);
    }
  return (
    <div>
        <form>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name='name'
                placeholder='Name'
                value={input.name}
                onChange={event => handleFormChange(index, event)}
              />
              <input
                name='age'
                placeholder='Age'
                value={input.age}
                onChange={event => handleFormChange(index, event)}
              />
            </div>
          )
        })}
        <button onClick={addFields} className='btn btn-primary mt-2 mr-2'>Add More..</button>
        <button onClick={submit} className='btn btn-primary mt-2'>submit</button>
      </form>
    </div>
  )
}
