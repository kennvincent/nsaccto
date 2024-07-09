// Office user view

import React, { useEffect, useState,useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import AllocateOfficeBudget from './AllocateOfficeBudget';
import axios from 'axios';
import AugmentBudget from './AugmentBudget';
import axiosClient from '../../axios-client';
import CurrentPosts from './CurrentPosts';
import Pagination from './Pagination';


  export default function OfficeBudget() {
  const location = useLocation();
  
  const win = window.sessionStorage;

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
  const postsPerPage=20;


 
  
  useEffect(()=>{
 
    var ofc = win.getItem('officename');
      setOfficeName(win.getItem('officename'));
      axiosClient.get(`/displayofficebudget/${ofc}`,).then(res=>{
        setBudgets(res.data.budgets);
      });
     
  

  },[]);

 

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = budgets.slice(firstPostIndex,lastPostIndex);


  const handlePageClick = (page)=>{
   setCurrentPage(page);
  }
  
  return (
    <div className='p-2 w-full bg-white'>
        <h4>Office: {officename} </h4>

        <CurrentPosts posts={currentPosts} />
        <Pagination totalPosts={budgets.length} postsPerPage={postsPerPage} onPageClicked={handlePageClick}/>
      
    </div>
  )
}
