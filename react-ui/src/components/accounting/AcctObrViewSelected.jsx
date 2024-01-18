import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

export default function AcctObrViewSelected() {
  const location = useLocation();

  const [obr,setObr] = useState([]);
  const [obrtotal,setObrTotal]=useState([]);
  let obrid = location.state.obrid;
  
  let payee="";
  let officedesc="";
  let officename="";
  let officeaddress="";
  let particulars="";
  let officecode="";
  let totalamount=0;
  let obrstatus="";

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/obligationrequest/budgetview/selected/${location.state.obrid}`).then(res=>{
        setObr(res.data.obr);
      });

    axios.get(`http://127.0.0.1:8000/api/obligationrequest/budgetview/selected/sum/${location.state.obrid}`).then(res=>{
        setObrTotal(res.data[0].obrtotal)
      });
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
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Address</p>
                </div>
                <div className='w-[85rem] h-8 border py-0 px-2'>
                    {obr.map((obr)=>{officeaddress = obr.officeaddress})}
                    <p>{officeaddress}</p>
                </div>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Responsibility Center</p>
                </div>
                <div className='w-[50rem] h-8 border py-0 px-2'>
                    <p>Particulars</p>
                </div>
                <div className='w-[10rem] h-8 border py-0 px-2'>
                    <p>F.P.P</p>
                </div>
                <div className='w-[10rem] h-8 border py-0 px-2'>
                    <p>Account Code</p>
                </div>
                <div className='w-[15rem] h-8 border py-0 px-2'>
                    <p>Amount</p>
                </div>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-96 items-center border p-2'>
                    {obr.map((obr)=>{officename = obr.officename})}
                    <p>{officename}</p>
                </div>
                <div className='w-[50rem] h-96  p-2'>
                    {obr.map((obr)=>{particulars = obr.particulars})}
                    <p>{particulars}</p>
                </div>
                <div className='w-[10rem] h-96 border p-0'>
                    {obr.map((obr)=>{officecode = obr.officecode})}
                    <p>{officecode}</p>
                </div>
                <div className='w-[10rem] h-96 border py-0 px-2'>
                    {obr.map((obr,index)=>(
                        <p className='p-0 m-0' key={index}>{obr.accountcode}</p>
                    ))}
                </div>
                <div className='w-[15rem] h-96 border py-0 px-2'>
                    {obr.map((obr,index)=>(
                        <p className='p-0 m-0 text-right' key={index}> {Number(obr.amount).toLocaleString()}</p>
                    ))}
                </div>
                
            </div>

            <div className='flex'>
                <div className='w-[85rem] h-8 border p-1 text-right'>
                        
                </div>
                <div className='w-[15rem] h-8 border p-1 text-right'>
                    <p className='text-right font-bold'> {Number(obrtotal).toLocaleString()}</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[85rem] h-11 border p-1 text-right'>
                        <p className='font-bold'>Amount paid</p>
                </div>
                <div className='w-[15rem] h-11 border text-right p-1' >
                    <input type="text" name="amount" id="amount" className='h-9 text-right font-bold w-[100%]' />
                </div>
            </div>

            <div className='flex'>
                <div className='w-[85rem] h-11 border p-1 text-right'>
                        
                </div>
                <div className='w-[15rem] h-11 border p-1'>
                    <button className='btn btn-primary btn-sm w-[100%]'>Save</button>
                </div>
            </div>

           
        </div>

    </div>
  )
}
