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
        <tr key={voucher.id}>
            <td>{voucher.payee}</td>
            <td>{voucher.address}</td>
            <td>{voucher.explanation}</td>
            <td><button onClick={handleVoucherView} className='btn btn-primary btn-sm'>View</button></td>
        </tr>
    )
   })

   

  return (
    <div>
        <div className='card'>
            <div className='card-header'>Vouchers List</div>
            <div className='card-body'>
                <table>
                    <thead>
                        <tr>
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
