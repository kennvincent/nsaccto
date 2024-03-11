import React,{useState,useEffect} from 'react'
import axiosClient from '../../axios-client';
import CurrentPosts from '../budget/CurrentPosts';
import Pagination from '../budget/Pagination';
import { useLocation } from 'react-router-dom'

const DisplayOfficeBudget = () => {

  const [officename,setOfficeName] = useState();
  const [budgets,setBudgets] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const postsPerPage=15;
  const win = window.sessionStorage;
  const location = useLocation();

  useEffect(()=>{
    var user = window.localStorage.getItem('user');

    setOfficeName(location.state.officename);
    // axiosClient.get(`/displayofficebudget/${location.state.officename}`,).then(res=>{
    axiosClient.get(`/displayofficebudget/${location.state.officename}`,).then(res=>{
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
    <div className='bg-white'>
      <h5>Office Budget: {officename}</h5>
      
      <CurrentPosts posts={currentPosts} />
        <Pagination totalPosts={budgets.length} postsPerPage={postsPerPage} onPageClicked={handlePageClick}/>
    </div>
  )
}

export default DisplayOfficeBudget
