import { da, tr } from 'date-fns/locale';
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function DynamicInput() {
    //   const [inputFields, setInputFields] = useState([
    //     { accountcode: '', amount: '' }
    //   ])

    //   const handleFormChange = (index, event) => {
    //     let data = [...inputFields];
    //     data[index][event.target.name] = event.target.value;
    //     setInputFields(data);
    //     console.log(inputFields);
    //   }

    //   const addFields = (e) => {
    //     e.preventDefault();
    //     let newfield = { accountcode: '', amount: '' }
    //     setInputFields([...inputFields, newfield])
    //   }
     
    // const submit=(e)=>{
    //     e.preventDefault();
    //     console.log(inputFields);
    // }

   
    const [inputFields,setInputFields]=useState([{}]);

    const data = [
      {
        accountcode:'0001',
        amount:'5000'
      },
    ]

    

    useEffect(()=>{
      setInputFields(data)
    },[])

    const handleInput=(index,e)=>{
        let data = [...inputFields];
        data[index][e.target.name] = e.target.value;
        setInputFields(data);
        console.log(inputFields);
    }

    const fields = inputFields.map((fld,index)=>{
      return(
        <div key={index}>
            <input type='text' name='accountcode' value={fld.accountcode} onChange={(e)=>handleInput(index,e)}/>
            {/* <input type='text' name='amount' value={fld.amount}/> */}
        </div>
      )
    })

    const handleSave = ()=>{
      console.log(inputFields)
    }
  return (
    <div>
        {fields}
        <button onClick={handleSave}>Save</button>
        {/* <form>
        {inputFields.map((input, index) => {
          return (
           <>
               <div key={index}>
                <input
                  name='accountcode'
                  // placeholder='Name'
                  value={input.name}
                  onChange={event => handleFormChange(index, event)}
                />
                <input
                  name='amount'
                  // placeholder='Age'
                  value={input.age}
                  onChange={event => handleFormChange(index, event)}
                />
              </div>
           </>
          )
        })}
        <button onClick={addFields} className='btn btn-primary mt-2 mr-2'>Add More..</button>
        <button onClick={submit} className='btn btn-primary mt-2'>submit</button>
      </form> */}
    </div>
  )
}
