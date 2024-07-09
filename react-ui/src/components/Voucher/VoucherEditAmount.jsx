import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

export default function VoucherEditAmount({visible,onCloseAmount,updateAmount,passAmount,newAmount}) {
   
    const [amount,setAmount] =useState(0);
    useEffect(()=>{
        setAmount(passAmount)
    },[]);
    
    const handleChangeAmount=(e)=>{
        setAmount(e.target.value);
    }

  

    if(!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
    <div className="bg-white p-4 rounded w-[20rem] ">
        <h1 className="font-semibold text-center text-xl text-gray-700">
            Voucher Amount
        </h1>
          <div>
          <input onChange={handleChangeAmount} type="text" className='h-8 w-full text-right' value={amount} /> <br />

           <button onClick={updateAmount} className=" text-white rounded mt-4 mr-2 btn btn-primary btn-sm w-14 text-center" >
                Ok
           </button>
           <button onClick={onCloseAmount}  className=" text-white rounded mt-4 btn btn-primary btn-sm w-14 text-center" >
                Close
           </button>

          </div>
    </div>
</div>
  )
}
