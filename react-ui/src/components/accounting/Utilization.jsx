import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';

export default function Utilization() {
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
      const response = await axiosClient.get(`/utilization/display?month=${month}&year=${year}`).then(res =>{
        setData(res.data.payments);
      });
    }catch(e){

    }
  }

  var grandTotal=0;

  const list = paymentsData.map((data,index)=>{
    grandTotal = grandTotal + parseFloat(data.totalpayments);
    return(
      <tr key={index} className='hover:bg-slate-200'>
        <td className='p-1'>{data.accountdesc}</td>
        <td className='p-1'>{data.accountcode}</td>
        <td className='p-1 text-right '>{data.totalpayments>0?Number(data.totalpayments).toLocaleString():''}</td>
      </tr>
    )
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const optionData = months.map((month,index)=>{
    return(
      <option key={index} value={index+1} >{month}</option>
    );
    
  })


  return (
   
    <div>
      <div className='card bg-white'>
        <div className='card-header bg-green-600'><h5>Utilization Summary</h5></div>
        <div className='card-body'>
          <div>
            <select value={month} onChange={onChangeMonth} className='p-1 w-[10rem]'>
              {optionData}
            </select>
            <select name="" id="" onChange={onChangeYear} className='p-1 w-[6rem]'>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <button onClick={onClickDisplay} className='w-[10rem] hover:bg-slate-400 hover:text-white ml-2 p-1 border border-black'>Display</button>
          </div>
          <div className='mt-2'>
            <table className='border'>
              <thead>
                <tr>
                  <th  className='w-[35rem]'>Description</th>
                  <th  className='w-[15rem]'>Account Code</th>
                  <th  className='w-[10rem] text-right'>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {list}
                <tr className='border'>
                  <td className='p-1'></td>
                  <td className='p-1 text-right'>Grand Total</td>
                  <td className='p-1 text-right font-bold'>{grandTotal>0?Number(grandTotal).toLocaleString():''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
