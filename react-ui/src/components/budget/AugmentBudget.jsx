import React from 'react'

export default function AugmentBudget({visible,onClose}) {


const handleInput=()=>{

}

const saveAugmentBudget=(e)=>{
    e.preventDefault();
}

if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
      <div className="bg-white p-4 rounded w-[40rem] ">
          <h1 className="font-semibold text-center text-xl text-gray-700">
            Augment Budget
          </h1>

          <form onSubmit={saveAugmentBudget}>
            <div className="flex flex-col ">
              <div>
                  <label htmlFor="accountdesc">Account Description</label>
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
