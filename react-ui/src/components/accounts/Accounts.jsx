import React, { useReducer } from 'react';
import axios from 'axios'
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import EditAccount from './editaccount';
import AddNewAccount from './AddNewAccount';
import axiosClient from '../../axios-client';

export default function Accounts() {

    const [showAddNew,setAddNew] = useState(false);
    const [showEdit,setShowEdit] = useState(false);
    const [accounts,setAccounts] =useState([]);

    const [account,setAccount] =useState({});
    const navigate= useNavigate;

    const [reducer,setReducer] = useReducer(x => x + 1,0);
   
    const handlesetAddNew = () => {
      
      setAddNew(true);
    }

    const handleCloseAddNew = ()=>{
      setAddNew(false);
      setReducer();
    }

    const handleShowEdit = (id,desc,code)=>{
      setShowEdit(true);

       const data = {'id':id,'accountdesc':desc,'accountcode':code};
       setAccount(data);
   
    }

    const handleCloseEdit = ()=>{
      
      setShowEdit(false);
      setReducer();
     
    }

    useEffect(()=>{

      axiosClient.get(`/accounts`).then(res=>{
          setAccounts(res.data.accounts);
         
      });
      
    },[reducer]);
   


  var accountList = accounts.map((account)=>{
    return(
        <tr key={account.id} className='border border-indigo-600'>
            
            <td className='p-1 '>{account.accountdesc}</td>
            <td className='p-1'>{account.accountcode}</td>
            <td className='float-right p-1'><button onClick={() => handleShowEdit(account.id,account.accountdesc,account.accountcode)} 
            className='btn btn-primary btn-sm w-16 p-0'>Edit</button></td>
        </tr>
    );
})

      return (
        
        <section>
          
          <div className='card w-full bg-red-600 flex'>
            <div className='card-header flex bg-black-200'><h4>Accounts List</h4>
              <button className='btn btn-success btn-sm right-6 absolute ' onClick={handlesetAddNew}>Add New</button>
            </div>
            <div className='card-body p-0 overflow-scroll h-[45rem]'>
              <table className='table-auto w-full border-separate border border-slate-700'>
                <thead>
                  <tr>
                    <th>Account Description</th>
                    <th>Account Code</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {accountList}
                </tbody>
              </table>
            </div>
          </div>

          <EditAccount onClose={handleCloseEdit} data={account} visible={showEdit} />
          <AddNewAccount onClose={handleCloseAddNew} visible={showAddNew}/>
        </section>
      )


}
