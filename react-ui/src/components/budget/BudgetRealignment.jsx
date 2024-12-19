import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import SelectBudgetFrom from './SelectBudgetFrom';

const BudgetRealignment = () => {
    const [budgetyear,setBudgetYear]=useState('');
    const [allbudgets,setAllBudgets]=useState([]);

    const [showBudgetFrom,setShowBudgetFrom] = useState(false)
    useEffect(()=>{
        axiosClient.get(`getobryear`).then(res=>{
            setBudgetYear(res.data.obryear[0].budgetyear);
        });
        
    },[]);

    


    const [showDialogFrom, setShowDialogFrom] = useState(false);

    const handleShowBudgetFromClick = ()=>{
        setShowBudgetFrom(true);
        axiosClient.get(`getallbudgetyear/${budgetyear}`).then(res=>{
            setAllBudgets(res.data.budgets);
        })
    }

  
  return (
    <>
    
        <div className='card w-[1000px] m-auto'>
            <div className='card-header'>
                <h5>Budget Realignment {budgetyear}</h5>
            </div>

            <div className='card-body '>
                
                <div className='border border-solid btn-sm p-2 mb-4'>
                    <button className='btn btn-primary btn-sm' onClick={handleShowBudgetFromClick} >Add</button>
                    <h5>From</h5>
                    
                </div>  

                <div className='border border-solid btn-sm p-2'>
                    <button className='btn btn-primary btn-sm'>Add</button>
                    <h5>To</h5>
                </div>
                
            </div>
            
          
        </div>

        <SelectBudgetFrom visible={showBudgetFrom} dataBudgetFrom={allbudgets} onClose={()=>setShowBudgetFrom(false)}/>
    </>
  )
}

export default BudgetRealignment
