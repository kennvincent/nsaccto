import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';

export default function Payments() {

  const [month,setMonth] = useState();
  const [year,setYear] = useState();
  const [paymentsData,setData]=useState([]);

  useEffect(()=>{
    let newDate = new Date();
    let current_month = newDate.getMonth() + 1;
    let current_year = newDate.getFullYear();
    setMonth(current_month);
    setYear(current_year);
  },[])
  const onChangeMonth = (e)=>{
    e.preventDefault();
    setMonth(e.target.value);
  }

  const onChangeYear = (e)=>{
    e.preventDefault();
    setYear(e.target.value);
  }

  const onClickDisplay = ()=>{
    fethData();
  }
  const fethData = async()=>{
    try{
      const response = await axiosClient.get(`/payment/display?month=${month}&year=${year}`).then(res =>{
        setData(res.data.payments);
      });
    }catch(e){

    }
  }

  var grandTotal=0;
  const list = paymentsData.map((data)=>{
    grandTotal = grandTotal + data.amountpaid;
  
    return(
      <tr key={data.id} className='hover:bg-slate-200'>
        <td>{data.officename}</td>
        <td>{data.accountdesc}</td>
        <td>{data.accountcode}</td>
        <td className='text-right'>{Number(data.amountpaid).toLocaleString()}</td>
      </tr>
    )
  });

  return (
    <div>
      <div className='card'>
        <div className='card-header bg-green-600'><h5>Payments</h5></div>
        <div className='card-body'>
          <div>
            <select name="" id="" onChange={onChangeMonth} className='p-1 w-[10rem]'>
              <option value="1">January</option>
              <option value="2">February</option>
            </select>
            <select name="" id="" onChange={onChangeYear} className='p-1 w-[6rem]'>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <button onClick={onClickDisplay} className='w-[10rem] hover:bg-slate-400 hover:text-white ml-2 p-1 border border-black'>Display</button>
          </div>
          <div className='mt-2'>
            <table>
              <thead>
                <tr>
                  <th className='w-[10rem]'>Office name</th>
                  <th  className='w-[25rem]'>Description</th>
                  <th  className='w-[15rem]'>Account Code</th>
                  <th  className='w-[10rem] text-right'>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {list}
                <tr>
                  <td></td>
                  <td></td>
                  <td className='text-right'>Grand Total</td>
                  <td className='text-right'>{Number(grandTotal).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
