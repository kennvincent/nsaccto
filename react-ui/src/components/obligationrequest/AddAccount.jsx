import axios from 'axios';
import { vi } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'

export default function AddParticulars({visible,onClose,onAdd,passParticulars,passAccountCode,passAmount,passArrayData}) {
const [particulars,setParticulars] = useState("");
const [accounts,setAccounts] = useState([]);
const [account,setAccount] =useState("");
const [amount,setAmount] =useState(0);

const [arrayData,SetArrayDate]=useState(['AccountCode','Amount'])

const handleInput=(e)=>{
    setParticulars(e.target.value);
}
const handleInputAmount=(e)=>{
    setAmount(e.target.value);
}

useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/accounts`).then(res=>{
        setAccounts(res.data.accounts);
    })
},[]);

const accountsList = accounts.map((account) =>{
    return(
        <option value={account.id} key={account.id}>{account.accountdesc}</option>
    );
})


const handleSubmit = (e)=>{
    e.preventDefault();
    callback=particulars;
}

const getAccount = (e)=>{
    const id = e.target.value;
    axios.get(`http://127.0.0.1:8000/api/account/${id}`).then(res=>{
        setAccount(res.data.account);
    });
    
  
}

const handleClick = (e)=>{
    e.preventDefault();
    console.log(account + ' '+ amount);
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
                        <select  className='w-full' onChange={getAccount}>
                            <option value=""></option>
                            {accountsList}
                        </select>
                    </div>
                </div>

                <div className='w-full h-10 border border-black mt-2 pt-2 px-3'>
                    <p name='account' id='account'>{account.accountcode}</p>
                </div>
                {/* <div className="flex flex-col mt-3">
                    <div>
                        <label htmlFor="accountdesc">Description</label>
                    </div>
                    <div>
                        <textarea className='w-full rounded-sm' name="" id="" cols="30" rows="5" 
                        value={particulars} onChange={handleInput}></textarea>
                    </div>
                </div> */}

                <div className="flex flex-col mt-2">
                    <div>
                        <label htmlFor="amount">Amount</label>
                    </div>
                    <div>
                        <input type="text" name="amount" id="amount" className='w-full' value={amount} onChange={handleInputAmount} />
                    </div>
                </div>

                

                <div className="text-center gap-2 flex mt-2">
                    <button  className="px-5 py-2 bg-green-700 text-white rounded" 
                        // onClick={()=>{passParticulars(particulars),passAccountCode(account.accountcode),passAmount(amount),passArrayData(arrayData)}} 
                        onClick={()=>passArrayData(particulars,account.accountcode,amount)}
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
