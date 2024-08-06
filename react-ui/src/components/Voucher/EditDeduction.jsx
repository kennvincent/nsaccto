import React, { useEffect, useState } from 'react'

const EditDeduction = ({visibleedit,onCloseEdit,passArrayEditData,deduction,onUpdate}) => {

    // const [amount,setAmount] =useState(editamount);
    // const [deduction,setDeduction]=useState(editdeduction);

    const [formData,setFormData] =useState({
        description:'',
        amount:''
    });

    useEffect(()=>{
        setFormData({
            description: deduction?.description,
            amount:Number(deduction?.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        })
    },[deduction]);


    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData(preveState =>({
            ...preveState,
            [name]:value
        }));
    };

    // const handleInputDeduction=(e)=>{
    //     // setDeduction(e.target.value)
    //     onChangeDeduction(e.target.value)

    // }

    // const handleInputAmount=(e)=>{
    //     setAmount(e.target.value);
    // }


    const handleSubmit = (e)=>{
        const cleanedAmount = formData.amount.replace(/,/g, '');

        e.preventDefault();
        const updatedDeduction ={
            ...deduction,
            ...formData,
            amount: cleanedAmount
        };

        onUpdate(updatedDeduction);
    }
    if(!visibleedit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
        <div className="bg-white p-4 rounded w-[40rem] ">
            <h1 className="font-semibold text-center text-xl text-gray-700">
                Edit Particulars
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-2">
                        <div>
                            <label htmlFor="deduction">Deduction</label>
                        </div>
                        <div>
                            <input type="text" name="description" id="deduction"
                            className='w-full' value={formData.description} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="flex flex-col mt-2">
                        <div>
                            <label htmlFor="amount">Amount</label>
                        </div>
                        <div>
                            <input type="text" name="amount" id="amount"  inputmode="numeric"
                            className='w-full' value={formData.amount} onChange={handleChange} />
                        </div>
                    </div>



                    <div className="text-center gap-2 flex mt-2">
                        {/* <button  className="px-5 py-2 bg-green-700 text-white rounded"

                            onClick={()=>passArrayEditData(id,deduction,amount)}
                            // onClick={passArrayEditData}
                            >
                            Ok
                        </button> */}

                        <button type="submit" className="px-5 py-2 bg-green-700 text-white rounded">Update</button>
                        <button className="px-5 py-2 bg-red-700 text-white rounded" onClick={onCloseEdit}>
                            Close
                        </button>
                    </div>

                </form>
        </div>
    </div>
  )
}

export default EditDeduction
