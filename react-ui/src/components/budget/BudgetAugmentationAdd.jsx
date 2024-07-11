import React from 'react'

const BudgetAugmentationAdd = ({visible,onClose}) => {

    if(!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
        <div className="card bg-white p-4 rounded ">
            <div className='card-header'><h6>Add Account</h6></div>
            <div className='card-body'>
                <table>
                    <tr>
                        <td className='col-span-3 w-full'>Sources of funds</td>
                        <td className='col-span-3'>Uses of funds</td>
                    </tr>
                    <tr>
                        <td className='p-0'>OBject of Expenditures</td>
                        <td className='p-0'>Expense Class</td>
                        <td className='p-0'>Amount</td>

                        <td className='p-0'>OBject of Expenditures</td>
                        <td className='p-0'>Expense Class</td>
                        <td className='p-0'>Amount</td>
                    </tr>
                    <tr>
                        <td className='p-0'><select className=' h-8 w-[200px]'></select></td>
                        <td className='p-0'><input type="text" className=' h-8 w-[150px]'/></td>
                        <td className='p-0'><input type="text" className=' h-8 w-[150px]'/></td>

                        <td className='p-0'><select className=' h-8 w-[200px]'></select></td>
                        <td className='p-0'><input type="text" className=' h-8 w-[150px]'/></td>
                        <td className='p-0'><input type="text" className=' h-8 w-[150px]'/></td>
                    </tr>
                    <tr>
                        <td className='p-0 py-1'><button className='btn btn-primary btn-sm w-[150px]'>Add</button></td>
                        <td onClick={onClose} className='p-0 py-1'><button className='btn btn-primary btn-sm w-[150px]'>Close</button></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  )
}

export default BudgetAugmentationAdd