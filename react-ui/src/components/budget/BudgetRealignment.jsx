import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';

const BudgetRealignment = () => {
    const [offices,setOffices] = useState([]);
    const [accounts,setAccounts]=useState([]);
    const [availablebudget,setAvailableBudget]=useState(0);
    const [obligated,setObligated]=useState(0);
    const [utilized,setUtilized]=useState(0);
    useEffect(()=>{
        axiosClient.get(`offices`).then(res=>{
            setOffices(res.data.offices);
        })
        
    },[]);

    const loadOffices = offices.map((ofc)=>{
        return(
            <option key={ofc.id} value={ofc.officename} className='p-4'>{ofc.officedesc}</option>
        );
    });

    const onChangeOffice = (ofc)=>{
        axiosClient.get(`budgets/officebudget/accounts/${ofc}`,).then(res=>{
            setAccounts(res.data.budgets);
          });
    }

    const officeAccounts = accounts.map((budget)=>{
        return(
            <option key={budget.id} value={budget.id}>{budget.officecode} | {budget.funding} | {budget.accountcode} | {budget.particulars}</option>
        );
    });

    const getAvailableBalance = ()=>{

    }
  return (
    <div className='card w-[1000px] m-auto'>
        <div className='card-header'>
            <h5>Budget Realignment</h5>
        </div>
        <div className='card-body '>
             <div>
                <h6 className='p-0 m-0'>Office</h6>
                <select onChange={(e)=>onChangeOffice(e.target.value)} className='w-full form-control'>
                    <option >--Select Office--</option>
                    {loadOffices}
                </select>
             </div>
             <div className='mt-4'>
                <h6 className='p-0 m-0'>Account From</h6>
                <select className='w-full form-control'>
                    <option></option>
                    {officeAccounts}
                </select>
             </div>
             <div className='mt-4'>
                <h6 className='p-0 m-0'>Account To</h6>
                <select className='w-full  form-control'>
                    <option></option>
                    {officeAccounts}
                </select>
             </div>

            
        </div>
        
        
       
    </div>
  )
}

export default BudgetRealignment
