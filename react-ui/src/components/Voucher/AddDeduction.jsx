import React, { useState } from 'react'

export default function AddDeduction({visible,onClose,passArrayData}) {
    const [amount,setAmount] =useState(0);
    const [deduction,setDeduction]=useState();
  

    const handleInputDeduction=(e)=>{
        setDeduction(e.target.value);
    }
    
    const handleInputAmount=(e)=>{
        setAmount(e.target.value);
    }

    if(!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
        <div className="bg-white p-4 rounded w-[40rem] ">
            <h1 className="font-semibold text-center text-xl text-gray-700">
                Add Particulars
                </h1>

               
               
                <div className="flex flex-col mt-2">
                    <div>
                        <label htmlFor="deduction">Deduction</label>
                    </div>
                    <div>
                        <input type="text" name="deduction" id="deduction" 
                        className='w-full' value={deduction} onChange={handleInputDeduction } />
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
                       
                        onClick={()=>passArrayData(deduction,amount)}
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
