import React, { useState } from 'react'

const SelectBudgetFrom = ({visible,onClose,dataBudgetFrom}) => {
    const [searchTerm,setSearchTerm] =useState('');

    const filterRecords = dataBudgetFrom.filter(data=>
        data.particulars.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        data.office.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || 
        data.accountcode.toLowerCase().includes(searchTerm.toLocaleLowerCase()) 
    );

    const budgetList = filterRecords.map((budget)=>{
        return(
            <tr key={budget.id}>
                <td>{budget.accountcode}</td>
                <td>{budget.particulars}</td>
                <td>{budget.officecode}</td>
                <td>{budget.office}</td>
                <td>Select</td>
            </tr>
        )
    });

    const handleSearchChange = (e)=>{
        setSearchTerm(e.target.value)
    }

    if(!visible) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'>
        <div className='card'>
            <div className='card-header flex'><h6>Budget From</h6> <button onClick={onClose} className='absolute right-2 btn btn-primary btn-sm'>Close</button></div>
            <div className='card-body h-[300px] overflow-y-scroll'>
            <input type="text" className='mb-2 w-full rounded-md' onChange={handleSearchChange} placeholder='Search...'/>
            <table>
                    <thead>
                        <tr>
                            <th>Acount Code</th>
                            <th>Particulars</th>
                            <th>Office Code</th>
                            <th>Office Name</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgetList}
                    </tbody>
                </table>
            </div>
        </div>
      
    </div>
  )
}

export default SelectBudgetFrom
