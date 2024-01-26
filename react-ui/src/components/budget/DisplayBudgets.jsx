import React,{useEffect,useState} from 'react'
import axios from 'axios'
import axiosClient from '../../axios-client';


export default function DisplayBudgets() {

    const [budgets,setBudgets] = useState([]);
    
    useEffect(()=>{
        axiosClient.get(`/budgets`).then(res =>{
            setBudgets(res.data.budgets);
            
        },[]);
    });

    const budgetlist = budgets.map((budget)=>{
        return(
            <tr key={budget.id}>
                <td>{budget.office}</td>
                <td>{budget.particulars}</td>
                <td>{budget.accountcode}</td>
                <td className='text-right'>{Number(budget.proposedamount).toLocaleString()}</td>
                <td>{budget.accountclassification}</td>
                <td>{budget.funding}</td>
            </tr>
        )
    });
  return (
    <div>
        <div className='card'>
            <div className='card-header'><h4>Budgets</h4></div>
        </div>
        <div className='card-body overflow-scroll h-[50rem]'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Office</th>
                        <th>Particulars</th>
                        <th>Account code</th>
                        <th>Amount</th> 
                        <th>Account Classification</th>
                        <th>Funding</th>
                    </tr>
                </thead>
                <tbody>
                    {budgetlist}
                </tbody>
            </table>
        </div>
    </div>
  )
}
