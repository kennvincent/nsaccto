import React from 'react'
import { useLocation } from 'react-router-dom'

export default function CreateVoucher() {
    const location = useLocation();
    let obrid = location.state.obrid;
    console.log(obrid);
  return (
    <div>Create Voucher</div>
  )
  
}
