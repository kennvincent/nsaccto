import React from 'react'

const CurrentPosts = ({posts}) => {
 
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
            
                </tr>
            </thead>
            <tbody>
            
            {posts.map((budget)=>{
                return(
                    <tr key={budget.id} className='border hover:bg-slate-100 p-0'>
                        <td className='py-1'>{budget.particulars}</td>
                        <td className='py-1'>{budget.accountcode}</td>
                        <td className='py-1 text-right'>{Number(budget.proposedamount).toLocaleString()}</td>
                        <td className='py-1 text-right'>0.00</td>
                        <td className='py-1 text-right'>0.00</td>
                        <td className='py-1 text-right'>{Number(budget.proposedamount).toLocaleString()}</td>
                        <td className='py-1 text-right'>0.00</td>
                        <td className='py-1 text-right'>0.00</td>
                        <td className='py-1 text-right'>{Number(budget.proposedamount).toLocaleString()}</td>
                    </tr>
                );
               
            })}


            </tbody>
        </table>
    </div>
  )
}

export default CurrentPosts