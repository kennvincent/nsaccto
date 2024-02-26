import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';

export default function Payments() {

  const [month,setMonth] = useState();
  const [year,setYear] = useState();


  const onChangeMonth = (e)=>{
    e.preventDefault();
    setMonth(e.target.value);
   
  }

  const onChangeYear = (e)=>{
    e.preventDefault();
    setYear(e.target.value);
    console.log(year);
  }

  const onClickDisplay = ()=>{
    fethData();
  }
  const fethData = async()=>{
    try{
      const response = await axiosClient.get(`/payment/display?month=${month}&year=${year}`).then(res =>{
        console.log(res.data.message);
      });
    }catch(e){

    }
  }

  return (
    <div>
      <div className='card'>
        <div className='card-header'>Payments</div>
        <div className='card-body'>
          
          <select name="" id="" onChange={onChangeMonth}>
            <option value="1">January</option>
            <option value="2">February</option>
          </select>
          <select name="" id="" onChange={onChangeYear}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <button onClick={onClickDisplay} className='btn btn-primary ml-2'>Display</button>
        </div>
      </div>
    </div>
  )
}
