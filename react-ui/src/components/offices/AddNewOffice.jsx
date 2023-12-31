import { useState } from "react";
import axios from "axios";

export default function AddNewOffice({visible,onClose}) {
    const [office,setOffice] = useState('');

    const handleInput = (e)=>{
        e.persist();
        setOffice({...office,[e.target.name]: e.target.value});
    }

  

    const addOffice=(e)=>{
        e.preventDefault();
       
        const newOffice = {
          officecode : office.officecode,
          officename : office.officename,
          officedesc : office.officedesc
        }
    
    
      
        
        axios.post(`http://127.0.0.1:8000/api/office`,newOffice).then(res =>{
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
    <form action="" method='post' onSubmit={addOffice}>
        @csrf
        @method('post')
        <div className="bg-white p-4 rounded w-[60rem] ">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Add New Office
        </h1>

        <div className="flex flex-col ">
          <div>
              <label htmlFor="officecode">Office code</label>
          </div>
          <div>
              <input
              type="text" name="officecode"   value={office?office.officecode:''} onChange={handleInput}
              className="border w-full border-gray-700 rounded mb-3"/>
          </div>
        </div>

        <div className="flex flex-col ">
          <div>
              <label htmlFor="officename">Office Name</label>
          </div>
          <div>
              <input
              type="text" name="officename"  value={office?office.officename:''} onChange={handleInput}
              className="border w-full border-gray-700 rounded mb-3"/>
          </div>
        </div>

        <div className="flex flex-col ">
          <div>
              <label htmlFor="officedesc">Description</label>
          </div>
          <div>
              <input
              type="text" name="officedesc"  value={office?office.officedesc:''} onChange={handleInput}
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
