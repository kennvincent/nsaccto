import React, { useEffect, useState,useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import AllocateOfficeBudget from './AllocateOfficeBudget';
import axios from 'axios';
import AugmentBudget from './AugmentBudget';


  export default function OfficeBudget() {
  const location = useLocation();

  const [showAllocateBudget,setShowAllocateBudget] = useState(false);


  const handleShowAllocateBudget = () => {
    setShowAllocateBudget(true);
  }

  const handleCloseAllocateBudget = () => {
    setShowAllocateBudget(false);
    setReducer();
  }

  const [showAugment,setShowAugment] = useState(false);
  const handleShowAugmentBudget = () => {
    setShowAugment(true);
  }

  const handleHideAugmentBudget = ()=>{
    setShowAugment(false);
  }


  const [budgets,setBudgets] = useState([]);
  const [reducer,setReducer] = useReducer(x => x + 1,0);

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/budgetallotment/${location.state.id}}`).then(res=>{
      setBudgets(res.data.budget);
    });
  },[reducer]);

  var budgetList = budgets.map((budget) =>{
    return (
      <tr key={budget.id} className='border hover:bg-slate-100 p-0'>
        <td className='py-1'>{budget.accountdesc}</td>
        <td className='py-1'>{budget.accountcode}</td>
        <td className='py-1'>{Number(budget.amount).toLocaleString()}</td>
        <td className='py-1'>0.00</td>
        <td className='py-1'>0.00</td>
        <td className='py-1'>{Number(budget.amount).toLocaleString()}</td>
        <td className='py-1'><button className='btn btn-primary btn-sm'>Edit</button></td>
        <td className='py-1'><button className='btn btn-warning btn-sm'>Transfer</button></td>
        <td className='py-1'><button className='btn btn-success btn-sm' onClick={handleShowAugmentBudget}>Augment</button></td>
      </tr>
    )
  })

  return (
    <div className='p-2 w-full bg-white'>
      <div className='flex relative '>
        <h4>Office : {location.state.office}</h4> <button className='btn btn-primary btn-sm right-0 
        absolute' onClick={handleShowAllocateBudget}>Add Budget</button>
      </div>
      <table className='border mt-2'>
        <thead className='bg-slate-200'>
          <tr>
            <th className='w-[40rem] py-2'>Description</th>
            <th className='w-[10rem] py-2'>Account code</th>
            <th className='w-[15rem] py-2'>Amount</th>
            <th className='w-[15rem] py-2'>Augmented</th>
            <th className='w-[15rem] py-2'>Transferred</th>
            <th className='w-[15rem] py-2'>Total</th>
            <th className='w-fit py-2'>&nbsp;</th>
            <th className='w-fit py-2'>&nbsp;</th>
            <th className='w-fit py-2'>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {budgetList}
        </tbody>
      </table>

      <AllocateOfficeBudget visible={showAllocateBudget} officeid={location.state.id} onClose={handleCloseAllocateBudget}/>
      <AugmentBudget visible={showAugment} onClose={handleHideAugmentBudget}/>
    </div>
  )
}
