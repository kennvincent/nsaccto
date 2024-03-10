import React, { useState } from 'react'

const OBRRejectRemarks = ({visible,onClose,handleRejectOBR}) => {
const [remarks,setRemarks] =useState("");
if(!visible) return null;

 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
        <div className="bg-white p-4 rounded w-[60rem] ">
            <h1 className="font-semibold text-center text-xl text-gray-700">
                Add Remarks
                </h1>

               

                <div className="flex flex-col mt-2">
                    
                    <div>
                        <textarea onChange={(e)=>setRemarks(e.target.value)} className='w-full' cols="30" rows="10"></textarea>
                    </div>
                </div>

                

                <div className="text-center gap-2 flex mt-2">
                    <button  className="px-5 py-2 bg-green-700 text-white rounded"
                        onClick={()=>handleRejectOBR(remarks)}>
                        Reject
                    </button>

                    <button className="px-5 py-2 bg-red-700 text-white rounded" onClick={onClose}>
                        Close
                    </button>
                </div>
        </div>
    </div>
  )
}

export default OBRRejectRemarks
