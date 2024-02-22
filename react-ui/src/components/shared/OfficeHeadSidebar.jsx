import React from 'react'
import {Link, useLocation,useNavigate} from 'react-router-dom'
import {FcBullish} from 'react-icons/fc'
import { FaPrint } from "react-icons/fa";
import { DASHBOARD_OFFICEHEAD_SIDEBAR_LINKS } from '../../lib/consts/navigation'
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/consts/navigation'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi'
import AccountingSidebar from './AccountingSidebar'
const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'



export default function OfficeHeadSidebar() {
    const navigate = useNavigate();

const handleLogout = ()=>{
  window.localStorage.removeItem('isLoggedIn');
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('usertype');
  navigate("/");
  }


  return (
    <div className='bg-neutral-900 p-3 w-60 flex flex-col text-white'>
      
        <div className='flex items-center gap-2 px-1 py-3'>
          <FcBullish fontSize={24}/>
          <span className='text-neutral-100 text-md'>Accounting Solutions</span>
        </div>
      
        <div className="flex-1 py-8 flex flex-col gap-0.5 ">
            {DASHBOARD_OFFICEHEAD_SIDEBAR_LINKS.map((item)=>(
              <SidebarLink key={item.key} item={item} />         
              ))}


        </div>
        

        <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item)=>(
              <SidebarLink key={item.key} item={item} />         
              ))}

            <div className={classNames('text-red-500 cursor-pointer',linkClass) }>
              <span className='text-xl'><HiOutlineLogout/></span>
              {/* <a href={'/'} className='text-red-500'>Logout</a> */}
              <a onClick={handleLogout} className='text-red-500'>Logout</a>
            </div>
        </div>
       
        
    </div>
  )
}

function SidebarLink({item}){
    const {pathname} = useLocation();
  
    return(
      <Link to={item.path} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white':'text-neutral-400' ,linkClass) }>
        <span className='text-xl'>{item.icon}</span>
        {item.label}
      </Link>
    )
  }
