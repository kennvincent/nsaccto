import axios from 'axios';
import { vi } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';

export default function AddParticulars({visible,onClose,onAdd,passParticulars,passAmount,passArrayData}) {
const [particulars,setParticulars] = useState("");
const [accounts,setAccounts] = useState([]);
const [accountCode,setAccountCode] =useState();
const [amount,setAmount] =useState(0);

const [arrayData,SetArrayDate]=useState(['AccountCode','Amount'])

const handleInput=(e)=>{
    setParticulars(e.target.value);
}

const handleInputAmount=(e)=>{
    setAmount(e.target.value);
}

useEffect(()=>{
    var officename = window.localStorage.getItem('officename');
   
    axiosClient.get(`/getaccounts/${officename}`).then(res=>{
        setAccounts(res.data.accounts);
    })
 
},[]);



const handleSubmit = (e)=>{
    e.preventDefault();
    callback=particulars;
}



const accountsList = accounts.map((account) =>{
    return(
        <option value={account.accountcode + ' ' + account.particulars} key={account.id}>{account.accountcode} - {account.particulars}</option>
    );
})



const handleClick = (e)=>{
    e.preventDefault();
}


if(!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
        <div className="bg-white p-4 rounded w-[60rem] ">
            <h1 className="font-semibold text-center text-xl text-gray-700">
                Add Particulars
                </h1>

                <div className="flex flex-col ">
                    <div>
                        <label htmlFor="accountdesc">Account Description</label>
                    </div>
                    <div>
                        <select  className='w-full' onChange={handleInput}>
                            <option value=""></option>
                            {accountsList}
                        </select>
                    </div>
                </div>

               

                <div className="flex flex-col mt-2">
                    <div>
                        <label htmlFor="amount">Amount</label>
                    </div>
                    <div>
                        <input type="text" name="amount" id="amount" pattern="[0-9]*" inputmode="numeric"
                        className='w-full' value={amount} onChange={handleInputAmount} />
                    </div>
                </div>

                

                <div className="text-center gap-2 flex mt-2">
                    <button  className="px-5 py-2 bg-green-700 text-white rounded" 
                       
                        onClick={()=>passArrayData(particulars,amount)}
                        >
                        Add
                    </button>

                    <button className="px-5 py-2 bg-red-700 text-white rounded" onClick={onClose}>
                        Close
                    </button>
                </div>
        </div>
    </div>
  )
}
