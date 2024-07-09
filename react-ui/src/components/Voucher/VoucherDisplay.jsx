import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';

export default function VoucherDisplay({visible,onClose,data}) {
  const navigate = useNavigate();
    const vouchersList = data.map((voucher)=>{
        
    
        return(
           <tr key={voucher.id} className='h-8'>
            <td className='p-0 px-1'>{voucher.created_at}</td>
                <td>{voucher.checknumber}</td>
                <td>{voucher.bank}</td>
                <td className='p-0 text-right px-2'>{Number(voucher.voucheramount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td onClick={()=>handlePay(voucher.id,voucher.obrid)} className='p-0'><button className='btn btn-primary btn-sm h-7'>Pay</button></td>
           </tr>
        );
        
    });

   

    const handlePay = (voucherid,obrid)=>{
      navigate("/acctobrviewselected",{state:{obrid:obrid}});
    }

    if(!visible) return null;
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
        <div className="bg-white p-4 rounded w-[50rem] ">
            <h1 className="font-semibold text-center text-xl text-gray-700">
                Disbursement Voucher
            </h1>

            <table>
              <thead>
                <tr>
                    <th className='w-[200px]'>Date</th>
                    <th className='w-[200px]'>Check Number</th>
                    <th className='w-[400px]'>Bank</th>
                    <th className='w-[200px] text-right'>Amount</th>
                    <th>||||</th>
                </tr>
              </thead>
              <tbody>
                {vouchersList}
              </tbody>
            </table>
               <button className=" text-white rounded mt-4 btn btn-primary btn-sm w-14 text-center" onClick={onClose}>
                    Close
               </button>
        </div>
    </div>
  )
}
