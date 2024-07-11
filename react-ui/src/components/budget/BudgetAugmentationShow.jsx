import React, { useEffect, useState } from 'react'

const BudgetAugmentationShow = ({visible,data,onClose}) => {

    const [sum,setSum] =useState(0);
    useEffect(() => {
        const totalSum = data.reduce((acc, detail) => acc + Number(detail.amount_to), 0);
        setSum(totalSum);
      }, [data]);
    
      
     const displayDetails = data.map((detail)=>{
       
        return(
            <tr key={detail.detail_id}>
                <td className='p-1  border border-black w-[150px]'>{detail.object_expenditures_from}</td>
                <td className='p-1  border border-black w-[150px]'>{detail.expense_class_from}</td>
                <td className='p-1  border border-black w-[150px] text-right'>{Number(detail.amount_from).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }</td>
                <td className='p-1  border border-black w-[150px]'>{detail.object_expenditures_to}</td>
                <td className='p-1  border border-black w-[150px]'>{detail.expense_class_to}</td>
                <td className='p-1  border border-black w-[150px] text-right'>{Number(detail.amount_to).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }</td>
            </tr>

        );
    });

    if(!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
        <div className='card w-[900px]'>
            <div className='card-header'><h6>Budget Augmentation</h6></div>
            <div className='body p-1'>
                
                <div className='p-0'>
                    <h5 className='text-center p-0'>AUGMENTATION FORM</h5>
                    <h5 className='text-center p-0'>FY: {data[0]?.fy}</h5>
                </div>
                <div className='flex p-0 m-0'>
                    <div className='w-[600px] flex p-0'><p className='p-0 m-0'>Local Government Unit:&nbsp;</p><p className='p-0 m-0'>{data[0]?.lgu}</p></div>
                    <div className='w-[300px] flex p-0'><p className='p-0 m-0'>Ordinance No.:</p>&nbsp;<p className='p-0 m-0'>{data[0]?.ordinanceno}</p></div>
                </div>
                <div className='flex p-0  m-0'>
                    <div className='w-[600px] flex p-0'><p className='p-0 m-0'>Office:</p>&nbsp;<p className='p-0 m-0'>{data[0]?.officename}</p></div>
                    <div className='w-[300px] flex p-0'><p className='p-0 m-0'>Date:</p>&nbsp;<p className='p-0 m-0'>{data[0]?.dated}</p></div>
                </div>
                <div className='flex p-0  m-0'>
                    <div className='w-[600px] flex p-0'><p className='p-0 m-0'>No:</p>&nbsp;<p className='p-0 m-0'>{data[0]?.augmentationno}</p></div>
                </div>

                <div className='m-auto text-center mt-4'>
                    <table>
                        <thead>
                            <tr>
                                <th colspan="3" className='text-center p-0  border border-black'>Sources of Funds</th>
                                <th colspan="3" className='text-center p-0  border border-black'>Uses of Funds</th>
                            </tr>
                            <tr>
                                <th colspan="3" className='text-center p-0  border border-black'>From</th>
                                <th colspan="3" className='text-center p-0  border border-black'>To</th>
                            </tr>
                            <tr>
                                <th className='text-center p-1  border border-black w-[150px]'>Object of Expenditures</th>
                                <th className='text-center p-1  border border-black w-[150px]'>Expense Class</th>
                                <th className='text-center p-1  border border-black w-[150px]'>Amount</th>
                                <th className='text-center p-1  border border-black w-[150px]'>Object of Expenditures</th>
                                <th className='text-center p-1  border border-black w-[150px]'>Expense Class</th>
                                <th className='text-center p-1  border border-black w-[150px]'>Amount</th>
                            </tr>
                            <tr>
                                <th className='text-center p-1  border border-black w-[150px]'>(1)</th>
                                <th className='text-center p-1  border border-black w-[150px]'>(2)</th>
                                <th className='text-center p-1  border border-black w-[150px]'>(3)</th>
                                <th className='text-center p-1  border border-black w-[150px]'>(4)</th>
                                <th className='text-center p-1  border border-black w-[150px]'>(5)</th>
                                <th className='text-center p-1  border border-black w-[150px]'>(6)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayDetails}
                            <tr>
                                <td colspan="3" className='text-left p-1  border border-black '>TOTAL</td>
                                <td colspan="2" className='text-left p-1  border border-black w-[150px]'>TOTAL</td>
                                <td  className='text-right p-1  border border-black w-[150px]'>{Number(sum).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='mt-4'>
                    <button className='btn btn-primary btn-sm' onClick={onClose}>Close</button>
                </div>
                
            </div>
        </div>
        
    </div>
  )
}

export default BudgetAugmentationShow