import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import axiosClient from '../../axios-client';

export default function AcctObrViewSelected() {
  const location = useLocation();

  const [obr,setObr] = useState([]);
  let obrid = location.state.obrid;
  
  let payee="";
  let officedesc="";
  let officename="";
  let officeaddress="";
  let particulars="";
  let officecode="";
  let obrstatus="";

  useEffect(()=>{
    axiosClient.get(`/obligationrequest/budgetview/selected/${location.state.obrid}`).then(res=>{

        setObr(res.data.obr);
      
      });

    // axios.get(`http://127.0.0.1:8000/api/obligationrequest/budgetview/selected/sum/${location.state.obrid}`).then(res=>{
    //     setObrTotal(res.data[0].obrtotal)
    //   });
 },[]);

  return (
    <div className='bg-white'>
        <div className='card-body '>
            <div className='text-center p-0'>
                <h4>OBLIGATION REQUEST - PAYMENT</h4>
                {/* <h3> {obr.map((obr)=>{obrstatus = obr.obrstatus})}
                <p>{obrstatus}</p></h3> */}
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
                    <div className='w-[30rem] border px-2'>
                        {obr.map((obr,index)=>(
                            <div className='p-2'>
                                 <p className='inline w-10 mr-2'> {obr.accountcode}</p> 
                                 <input type="text" name={index} id="" value={obr.accountcode} className='h-8' />
                            </div>
                           
                       
                        ))}
                    
                    </div>

                    <div className='w-[20rem] border px-2'>
                        {obr.map((obr,index)=>(
                            <div>
                                <p className='text-right'> {Number(obr.amount).toLocaleString()}</p>
                                {/* <input type="text" name={index} id="" value={obr.accountcode} className='h-8' /> */}
                            </div>
                            
                        ))}
                    
                    </div>
                   
                </div>

                <div className='flex'>
                <div className='w-[15rem] h-8 border px-2'>
                        <p>Total Amount</p>
                </div>
                <div className='w-[50rem] h-8 border px-2'>
                    {obr.map((obr,index)=>(
                         <p className='text-right font-bold'> {Number(obr.totalamount).toLocaleString()}</p>
                    ))}
                   
                </div>
            </div>
            
            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2'>
                        <p className='font-bold'>Amount paid</p>
                </div>
                <div className='w-[85rem] h-11 border px-1' >
                    <input type="text" name="amount" id="amount" className='h-9 font-bold w-[50rem]' />
                </div>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2 '>
                        <p className='font-bold'>Check Number</p>
                </div>
                <div className='w-[85rem] h-11 border  px-1' >
                    <input type="text" name="checknumber" id="checknumber" className='h-9 font-bold w-[50rem]' />
                </div>
            </div>


            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2'>
                        <p className='font-bold'>Bank Name</p>
                </div>
                <div className='w-[85rem] h-11 border px-1' >
                    <input type="text" name="bankname" id="bankname" className='h-9 text-right font-bold w-[50rem]' />
                </div>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2'>
                        
                </div>
                <div className='w-[85rem] h-11 border p-1'>
                    <button className='btn btn-primary btn-sm w-[15rem]'>Save</button>
                </div>
            </div>

           
        </div>

    </div>
  )
}
