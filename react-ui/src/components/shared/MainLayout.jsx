import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { useState,useEffect } from 'react'
import axios from	'axios'
import { NavLink, useNavigate } from 'react-router-dom';
import AccountingSidebar from './AccountingSidebar'
import BudgetSidebar from './BudgetSidebar'
import {signal} from "@preact/signals-react"

export default function MainLayout() {
  
  const navigate = useNavigate();
  
 const logged = window.localStorage.getItem('isLoggedIn');

  const [usertype,setUserType] =useState();
  setTimeout(()=>{
    setUserType(window.localStorage.getItem('usertype'))

  },1000)

  return (
    <div  className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">

      {usertype ==="USR" &&  <Sidebar/>}
      {usertype ==="ACTG" && <AccountingSidebar/>}
      {usertype ==="BDGT" && <BudgetSidebar/>}

      <div className='flex-1'>
        <Header/>
        <div className='p-4'><Outlet></Outlet></div>
      </div>
      
    </div>
  )
}
