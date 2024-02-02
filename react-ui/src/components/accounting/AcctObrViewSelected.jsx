import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import axiosClient from '../../axios-client';

export default function AcctObrViewSelected() {
  const location = useLocation();

  const [obr,setObr] = useState([]);
  let obrid = location.state.obrid;
  
  const [accoutcode,setAccountcCode] = useState([]);
  let payee="";
  let officedesc="";
  let officename="";
  let officeaddress="";
  let particulars="";
  let officecode="";
  let obrstatus="";
  let totalamount="";
  let amountpaid="";

  useEffect(()=>{
    axiosClient.get(`/obligationrequest/accounting/selected/view/${location.state.obrid}`).then(res=>{
        setObr(res.data.obr);
      });

    },[]);

    const obrDetails = obr.map((detail)=>{
   
        return (
            <>
                <tr>
                    <td>{detail.accountcode}</td>
                    <td><input type="text" name="" id="accountcode[]" value={detail.accountcode} className='p-1'/></td>
                    <td className='w-40'></td>
                    <td className='text-right'>{Number(detail.amount).toLocaleString()}</td>
                    <td><input type="text"  name="" id="" value={detail.amount} className='text-right p-1'/></td>
                </tr>
             
            </>
        )
    })

    const handleClickSave=(e)=>{
        e.preventDefault();

        
    }
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
                   
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="2">Account Code</th>
                                    <th></th>
                                    <th>Payable</th>
                                    <th className='text-right'>Amount Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {obrDetails}
                                <tr>
                                {obr.map((obr)=>{totalamount = obr.totalamount})}
                                    <td className='text-right font-bold'>Total Amount</td>
                                    <td colSpan="3" className='text-right font-bold'>{Number(totalamount).toLocaleString()}</td>
                                    <td colSpan="3" className='text-right font-bold px-3'>{Number(totalamount).toLocaleString()}</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                   
                </div>

                <div className='flex'>

               
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
                    <button onClick={handleClickSave} className='btn btn-primary btn-sm w-[15rem]'>Save</button>
                </div>
            </div>

           
        </div>

    </div>
  )
}
