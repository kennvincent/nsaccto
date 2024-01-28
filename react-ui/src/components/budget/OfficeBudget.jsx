// Office user view

import React, { useEffect, useState,useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import AllocateOfficeBudget from './AllocateOfficeBudget';
import axios from 'axios';
import AugmentBudget from './AugmentBudget';
import axiosClient from '../../axios-client';
import CurrentPosts from './CurrentPosts';


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

  const [officename,setOfficeName] = useState();
  const [budgets,setBudgets] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostPerPage]=useState(5);
  const [currentPosts,setCurrentPosts] = useState([]);

  
  useEffect(()=>{
    var user = window.localStorage.getItem('user');
    var officename = window.localStorage.getItem('officename');
    setOfficeName(officename);
    axiosClient.get(`/displayofficebudget/${officename}`).then(res=>{
      setBudgets(res.data.budgets);
      setCurrentPage(1);

    });


  
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;


  setCurrentPosts(budgets.slice(firstPostIndex,lastPostIndex));



    

  },[]);

  
  // var budgetList = budgets.map((budget) =>{
  //   return (
  //     <tr key={budget.id} className='border hover:bg-slate-100 p-0'>
  //       <td className='py-1'>{budget.particulars}</td>
  //       <td className='py-1'>{budget.accountcode}</td>
  //       <td className='py-1 text-right'>{Number(budget.proposedamount).toLocaleString()}</td>
  //       <td className='py-1 text-right'>0.00</td>
  //       <td className='py-1 text-right'>0.00</td>
  //       <td className='py-1 text-right'>{Number(budget.proposedamount).toLocaleString()}</td>
  //       <td className='py-1 text-right'>0.00</td>
  //       <td className='py-1 text-right'>0.00</td>
  //       <td className='py-1 text-right'>{Number(budget.proposedamount).toLocaleString()}</td>
  
  //     </tr>
  //   )
  // })

  return (
    <div className='p-2 w-full bg-white'>
        <h4>Office: {officename}</h4>

        <CurrentPosts posts={budgets}/>
      <div className='flex relative '>
        {/* <h4>Office : {location.state.office}</h4> <button className='btn btn-primary btn-sm right-0 
        absolute' onClick={handleShowAllocateBudget}>Add Budget</button> */}
      </div>  
      {/* <table className='border mt-2'>
        <thead className='bg-slate-200'>
          <tr>
            <th className='w-[40rem] py-2'>Particular</th>
            <th className='w-[12rem] py-2'>Account code</th>
            <th className='w-[15rem] py-2 text-right'>Appropriation</th>
            <th className='w-[15rem] py-2 text-right'>Augmentation</th>
            <th className='w-[15rem] py-2 text-right'>Realignment</th>
            <th className='w-[15rem] py-2 text-right'>Total <br />Appropriation</th>
            <th className='w-[15rem] py-2 text-right'>Obligated</th>
            <th className='w-[15rem] py-2 text-right'>Utilized</th>
            <th className='w-[15rem] py-2 text-right'>Balance</th>
          
          </tr>
        </thead>
        <tbody>
          {budgetList}
        </tbody>
      </table> */}

      {/* <AllocateOfficeBudget visible={showAllocateBudget} officeid={location.state.id} onClose={handleCloseAllocateBudget}/>
      <AugmentBudget visible={showAugment} onClose={handleHideAugmentBudget}/> */}
    </div>
  )
}
