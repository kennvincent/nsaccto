import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import axiosClient from '../../axios-client';


export default function EditAccount({visible,onClose,data}) {



  // let {id} =useParams();

const [account,setAccount] = useState({});

useEffect(()=>{

  axiosClient.get(`/account/${data.id}`).then(res=>{
        setAccount(res.data.account);
        console.log(account);
    }).catch(function(error){

        if(error.response){
            if(error.response.status===404){

            }
        }
    });
},[data.id]);

const handleInput = (e)=>{
    e.persist();
    setAccount({...account,[e.target.name]: e.target.value});
}


// if(Object.keys(account).length===0){
//     return(
//         <div className='text-danger mt-5'>
//             <div className='card' style={{width:'25rem',margin:'0 auto'}}>
//                 <div className='card-header'>Message </div>
//                 <div className='card-body text-center'>
//                     <h3>No record found!!!</h3>
//                     <Link  to="/office" className='btn btn-danger btn-sm'>Close</Link>
//                 </div>
//             </div>

//         </div>
//     );
// }

const updateAccount=(e)=>{
  e.preventDefault();
  
  const updateData = {
    id :data.id,
    accountdesc : account.accountdesc,
    accountcode : account.accountcode
  }


  
  axios.put(`http://127.0.0.1:8000/api/account/update`,updateData).then(res =>{
      
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
    <form action="" method='put' onSubmit={updateAccount}>
        @csrf
        @method('put')
        <div className="bg-white p-4 rounded w-[60rem] ">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Edit Account
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
              type="text" name="accountcode"  value={account?account.accountcode:''}   onChange={handleInput}
              className="border w-full border-gray-700 rounded mb-3"/>
          </div>
        </div>

        <div className="text-center gap-2 flex ">
          <button className="px-5 py-2 bg-green-700 text-white rounded" type='submit'>
            Update
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
