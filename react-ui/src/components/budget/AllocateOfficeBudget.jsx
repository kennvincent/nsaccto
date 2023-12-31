import React, { useState,useEffect } from 'react'
import axios from 'axios';

export default function AllocateOfficeBudget({visible,onClose,data,officeid}) {

    const [accounts,setAccounts] =useState([]);

    const [account_id,setAccountId] = useState(0);
    const [amount,setAmount] = useState(0);

    useEffect(()=>{

        axios.get(`http://127.0.0.1:8000/api/accounts`).then(res=>{
            setAccounts(res.data.accounts);
        });
        
      },[]);


  const handleInput = (e)=>{
    e.persist();
    setAmount(e.target.value);
  
  }

  const handleSelectValue = (e)=>{
    setAccountId(e.target.value)
    
  }


  const saveBudget = (e) =>{
    e.preventDefault();
    
    const budget ={
      office_id : officeid,
      account_id : account_id,
      amount: amount
    }


    axios.post(`http://127.0.0.1:8000/api/budgetallotment`,budget).then(res=>{
      alert(res.data.message);
    }).catch(function(error){ 
      if(error.response){
          if(error.response.status===422){
             // setInputErrorList(error.response.data.errors);
          } else if(error.response.status===419){
            //setInputErrorList(error.response.data.errors);
            //console.log("ERROR " + error.response.status);
         }else if(error.response.status===500){
          console.log("ERROR DITO  " + error.response.status);
       }
         
      }
    });
  }


 if(!visible) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
      <div className="bg-white p-4 rounded w-[60rem] ">
          <h1 className="font-semibold text-center text-xl text-gray-700">
            Allocate Budget
          </h1>

          <form onSubmit={saveBudget}>
            <div className="flex flex-col ">
              <div>
                  <label htmlFor="accountdesc">Account Description</label>
              </div>
              <div>
                    <select name="account" className="border w-full border-gray-700 rounded mb-3" onChange={handleSelectValue}>
                      <option >--Select--</option>
                        {accounts.map((act) => (
                            <option value={act.id} key={act.id}>{act.accountdesc}</option>
                        ))}
                    </select>
              </div>
            </div>

            <div className="flex flex-col ">
              <div>
                  <label htmlFor="amount" >Amount</label>
              </div>
              <div>
                  <input  onChange={handleInput}
                  className="border w-[20rem] border-gray-700 rounded mb-3"/>
              </div>
            </div>

            <div className="text-center gap-2 flex ">
              <button className="px-5 py-2 bg-green-700 text-white rounded" type='submit' >
                Save
              </button>
              
              <button className="px-5 py-2 bg-red-700 text-white rounded" onClick={onClose}>
                Close
              </button>
            </div>
          </form>
          
        </div>
       
    </div>
  )
}
