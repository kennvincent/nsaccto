import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';

export default function VoucherList() {
    const [vouchersList,setVouchersList] =useState([]);
    const navigate = useNavigate();

    useEffect(()=>{

        axiosClient.get(`/voucher/list`).then(res =>{
            setVouchersList(res.data.vouchers);
        });

       
    },[]);


    const handleVoucherView = (e)=>{
        navigate('/voucherprintpreview');
       }
       
   const vouchers = vouchersList.map((voucher)=>{
    return(
        <tr key={voucher.id} className=' hover:bg-slate-100'>
            <td className='p-1'>{voucher.obrnumber}</td>
            <td className='p-1'>{voucher.payee}</td>
            <td className='p-1'>{voucher.address}</td>
            <td className='p-1'>{voucher.explanation}</td>
            <td className='p-1'><button onClick={handleVoucherView} className='btn btn-primary btn-sm'>View</button></td>
        </tr>
    )
   })

   

  return (
    <div>
        <div className='card'>
            <div className='card-header'>Vouchers List</div>
            <div className='card-body'>
                <table className='w-full border-collapse border  border-slate-400'>
                    <thead className='sticky top-0 bg-slate-200'>
                        <tr>
                            <th>OBR Number</th>
                            <th>Payee</th>
                            <th>Address</th>
                            <th>Explanation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers}
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
  )
}
