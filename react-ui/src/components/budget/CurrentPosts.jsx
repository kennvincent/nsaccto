import React, { useEffect, useState } from 'react'

const CurrentPosts = ({posts}) => {
    const[usertype,setUserType] = useState();
    const win = window.sessionStorage;
    useEffect(()=>{
        setUserType(win.getItem('usertype'));
    });
  return (
    <div>

        <table>
            <thead>
                <tr className='border hover:bg-slate-100 p-0'>
                    <th className='w-[40rem] py-2'>Particular</th>
                    <th className='w-[12rem] py-2'>Account code</th>
                    <th className='w-[15rem] py-2 text-right'>Appropriation</th>
                    <th className='w-[15rem] py-2 text-right'>Augmentation</th>
                    <th className='w-[15rem] py-2 text-right'>Realignment</th>
                    <th className='w-[15rem] py-2 text-right'>Total <br />Appropriation</th>
                    <th className='w-[15rem] py-2 text-right'>Obligated</th>
                    <th className='w-[15rem] py-2 text-right'>Utilized</th>
                    <th className='w-[15rem] py-2 text-right'>Balance</th>
                    {usertype=='ACTG'?<th className='w-[15rem] py-2 text-right'>Funding</th>:''}
                    {usertype=='ACTG'?<th className='w-[15rem] py-2 text-right'>Sector</th>:''}
                </tr>
            </thead>
            <tbody>
            
            {posts.map((budget)=>{
                return(
                    <tr key={budget.id} className='border hover:bg-slate-100 p-0'>
                        <td className='py-1'>{budget.particulars}</td>
                        <td className='py-1'>{budget.accountcode}</td>
                        <td className='py-1 text-right'>{budget.proposedamount>0?Number(budget.proposedamount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
:''}</td>
                        <td className='py-1 text-right'>{Number(budget.augmentation).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    }</td>
                        <td className='py-1 text-right'></td>
                        {/* <td className='py-1 text-right'>{budget.proposedamount>0?Number(budget.proposedamount).toLocaleString():''}</td> */}
                        <td className='py-1 text-right'>{(Number(budget.proposedamount) + Number(budget.augmentation)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    }</td>
                        <td className='py-1 text-right'>{budget.totalobligated>0?Number(budget.totalobligated).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }):""}</td>
                        <td className='py-1 text-right'>{budget.utilized>0?Number(budget.utilized).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }):""}</td>
                        {/* <td className='py-1 text-right'>{Number((budget.proposedamount) - budget.totalobligated)>0?Number(budget.proposedamount - budget.totalobligated).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
:''}</td> */}
                        <td className='py-1 text-right'>{(Number(budget.proposedamount) + Number(budget.augmentation)) - Number(budget.totalobligated) >0?((Number(budget.proposedamount) + Number(budget.augmentation)) - Number(budget.totalobligated)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
:''}</td>
                        {usertype=='ACTG'?<td className='py-1 text-right'>{budget.funding}</td>:''}
                        {usertype=='ACTG'?<td className='py-1 text-right'>{budget.sector}</td>:''}
                    </tr>
                );
               
            })}


            </tbody>
        </table>
    </div>
  )
}

export default CurrentPosts