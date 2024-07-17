import React, { useEffect, useState } from 'react'

const SelectAccount = ({visible,dataBudgetFrom,onClose,onCloseSelect}) => {
    
    const handleClickSelect = (accountcode,funding,officecode)=>{
        const data = {
            'accountcode':accountcode,
            'funding':funding,
            'officecode':officecode,
        }
        
        onCloseSelect(data);
       
    }


    if(!visible) return null;
  

    const budgetFromList = dataBudgetFrom.map((budget)=>{
        return(
            <tr key={budget.id} class="hover:bg-blue-100">
                <td className='p-1'>{budget.accountcode}</td>
                <td className='p-1'>{budget.particulars}</td>
                <td className='p-1'>{budget.accoountclassification}</td>
                <td className='p-1'>{budget.funding}</td>
                <td className='p-1'>{budget.officecode}</td>
                <td className='p-1'><a href="#" onClick={(e)=>handleClickSelect(budget.accountcode,budget.funding,budget.officecode)}>Select</a></td>
            </tr>
        );
    });

    const [filter,setFilter] = useState([]);

    const filterData=(e)=>{
        setFilter(e);
       
    }

    const filteredData = budgetFromList.filter((data)=>{
        data.type.includes(filter);
      
    });
    

  
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'>
        <div className='card'>
            <div className='card-header flex'><h6>Select Object of Expenditures/Account From</h6> <button onClick={onClose} className='absolute right-2 btn btn-primary btn-sm'>Close</button></div>
            <div className='card-body h-[300px] overflow-y-scroll'>
                <input type="text" className='mb-2 h-8 w-full' onChange={(e)=>filterData(e.target.value)}/>
                <table>
                    <thead>
                        <tr>
                            <th>Acount Code</th>
                            <th>Particulars</th>
                            <th>Classification</th>
                            <th>Funding</th>
                            <th>Office Code</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgetFromList}
                    </tbody>
                </table>
               
            </div>
        </div>
    </div>
  )
}

export default SelectAccount