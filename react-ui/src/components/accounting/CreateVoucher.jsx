import React from 'react'
import { useLocation } from 'react-router-dom'

export default function CreateVoucher() {
    const location = useLocation();
    let obrid = location.state.obrid;
    
  return (
    <div className='bg-white border-solid '>
        <div className='text-center  font-serif border p-5'>
            <p className='p-0 m-0'>Republic of the Philippines</p>
            <p className='p-0 m-0 font-bold'>PROVINCE OF NORTHERN SAMAR</p>
            <p className='p-0 m-0'>Catarman, Northern Samar</p>
        </div>
        <div className='flex'>
          <div className='w-[85rem] border text-center'>
            <p>DISBURSEMENT VOUCHER</p>
          </div>
          <div className='w-[15rem] border'>
            <p>No.</p>
          </div>
        </div>
    </div>
  )

}
