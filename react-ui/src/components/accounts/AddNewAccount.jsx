import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';


export default function AddNewAccount({visible,onClose}) {
  const [account,setAccount] = useState({});

  const handleInput = (e)=>{
    e.persist();
    setAccount({...account,[e.target.name]: e.target.value});
  }

  const addAccount=(e)=>{
    e.preventDefault();
   
    const newAccount = {
      accountdesc : account.accountdesc,
      accountcode : account.accountcode
    }


  
    
    axios.post(`http://127.0.0.1:8000/api/account`,newAccount).then(res =>{
        alert(res.data.message);
    })
    .catch(function(error){ 
      
        if(error.response){
            if(error.response.status===422){
                setInputErrorList(error.response.data.errors);
            } else if(error.response.status===419){
              //setInputErrorList(error.response.data.errors);
              console.log("ERROR " + error.response.status);
          }
        }
    });
  }
  
  
  
  if(!visible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
    <form action="" method='post' onSubmit={addAccount}>
        @csrf
        @method('post')
        <div className="bg-white p-4 rounded w-[60rem] ">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Add New Account
        </h1>

        <div className="flex flex-col ">
          <div>
              <label htmlFor="accountdesc">Account Description</label>
          </div>
          <div>
              <input
              type="text" name="accountdesc"   value={account?account.accountdesc:''} onChange={handleInput}
              className="border w-full border-gray-700 rounded mb-3"/>
          </div>
        </div>

        <div className="flex flex-col ">
          <div>
              <label htmlFor="accountcode">Account Code</label>
          </div>
          <div>
              <input
              type="text" name="accountcode"  value={account?account.accountcode:''} onChange={handleInput}
              className="border w-full border-gray-700 rounded mb-3"/>
          </div>
        </div>

        <div className="text-center gap-2 flex ">
          <button className="px-5 py-2 bg-green-700 text-white rounded" type='submit'>
            Add
          </button>

          
          <button className="px-5 py-2 bg-red-700 text-white rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </form>
</div>
  )
}
