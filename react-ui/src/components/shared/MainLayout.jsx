import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { useState,useEffect } from 'react'
import axios from	'axios'
import AccountingSidebar from './AccountingSidebar'
import { NavLink, useNavigate } from 'react-router-dom';
export default function MainLayout() {
  
  const navigate = useNavigate();
  
 const logged = window.localStorage.getItem('isLoggedIn');
 const usertype = window.localStorage.getItem('usertype');
  useEffect(()=>{
    if(!logged){
      navigate("/");
    }
  });

  return (
    <div  className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      
      <Sidebar/>
      
     
      <div className='flex-1'>
        <Header/>
        <div className='p-4'><Outlet></Outlet></div>
      </div>
    </div>
  )
}
