import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import axiosClient from '../../axios-client';

export default function AcctObrViewSelected() {
  const location = useLocation();

  const [obr,setObr] = useState([]);
  const [obr2,setObr2] = useState([]);
  let obrid = location.state.obrid;
  
  const [accountcode,setAccountCode] = useState([]);
  let payee="";
  let officedesc="";
  let officename="";
  let officeaddress="";
  let particulars="";
  let officecode="";
  let obrstatus="";
  let totalamount="";
  let amountpaid="";

  const [inputFields, setInputFields] = useState([]);

  

  useEffect(()=>{
    axiosClient.get(`/obligationrequest/accounting/selected/view/${location.state.obrid}`).then(res=>{
        setObr(res.data.obr);
        setObr2(res.data.obr);
      });
    
  },[]);




 

  
   
    const handleClickSave=(e)=>{
        e.preventDefault();
        // console.log(obr)
        // console.log(obr2)
   
    }

    const handleAccountCodeChange = (index, event) => {
         let data = [...obr2];
        data[index]['accountcode'] = event.target.value;
        setObr2(data);
    }

      const handleAmountChange = (index, event) => {
        // let data = [...inputFields];
        // data[index][event.target.name] = event.target.value;
        // setInputFields(data);
        
      }
      
      const addFields = (e) => {
        e.preventDefault();
        
      }

      
     
 
    const obrDetails = obr.map((detail,index)=>{
        return (
            <tr key={index} className='p-0'>
                <td className='p-1'><input type="text" name="accountcode1" value={detail.accountcode1} 
                onChange={(e)=>handleAccountCodeChange(index,e)} className='py-1' /></td>
                <td className='p-1'><input type="text" name="accountcode" value={detail.accountcode} 
                onChange={(e)=>handleAccountCodeChange(index,e)} className='py-1' /></td>
            </tr>
        )
    })


  return (
    <div className='bg-white'>
        <div className='card-body '>
            <div className='text-center p-0'>
                <h4>OBLIGATION REQUEST - PAYMENT</h4>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Payee</p>
                </div>
                <div className='w-[85rem] h-8 border px-2'>
                    {obr.map((obr)=>{payee = obr.payee})}
                    <p>{payee}</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Office</p>
                </div>
                <div className='w-[85rem] h-8 border px-2'>
                    {obr.map((obr)=>{officedesc = obr.officedesc})}
                    <p>{officedesc}</p>
                </div>
            </div>
           

                <div className='flex'>
                    <div className='w-[15rem] border px-2'>
                            <p>Account(s)</p>
                    </div>
                   
                    <div className='flex'>
                        <div>
                            <div className='p-1'><h5>Account Code</h5></div>
                            <div className='flex'>
                                <div>
                                    <table>
                                        <thead></thead>
                                        <tbody>
                                            {obrDetails}
                                        </tbody>
                                    </table>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                   
                </div>

                <div className='flex'>

               
            </div>
            
         
            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2 '>
                        <p className='font-bold'>Check Number</p>
                </div>
                <div className='w-[85rem] h-11 border  px-1' >
                    <input type="text" name="checknumber" id="checknumber" className='h-9 mt-1 font-bold w-[50rem]' />
                </div>
            </div>


            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2'>
                        <p className='font-bold'>Bank Name</p>
                </div>
                <div className='w-[85rem] h-11 border px-1' >
                    <input type="text" name="bankname" id="bankname" className='h-9 mt-1 font-bold w-[50rem]' />
                </div>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2'>
                        
                </div>
                <div className='w-[85rem] h-11 border p-1'>
                    <button onClick={handleClickSave} className='btn btn-primary btn-sm w-[15rem]'>Save</button>
                </div>
            </div>

           
        </div>

    </div>
  )
}
