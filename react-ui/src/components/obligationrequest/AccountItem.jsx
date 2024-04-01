import React, { useState } from 'react'

const AccountItem = ({item,handleEditItem,removeItem}) => {
    const [isEditing,setIsEditing] = useState(false);
    const [officecode,setOfficecode] = useState(item.name.officecode);
    const [classification,setClassification] = useState(item.name.classification);
    const [accountdesc,setAccountDesc] = useState(item.name.accountdesc);
    const [accountcode,setAccountCode] = useState(item.name.accountcode);
    const [amount,setAmount] = useState(item.name.amount);
    
    const onEdit = ()=> {
        if(amount.trim().length == 0){
            alert("Enter amounts");
            return;
        }

        if(!parseFloat(amount)){
            alert("Invalid amount value");
            return;
        }

   
       let strAmount = amount.replace(/,/g, '');
       setAmount(strAmount);
        handleEditItem(item.id,amount);
        setIsEditing(false);
    }

    const onCancel = () => {
        setIsEditing(false);
    }
    const onRemove = ()=>{
        removeItem(item.id);
    }
  return (
    <>
        <tr >   
            <td className='p-1 w-[140px]'>{officecode}</td>
            <td className='p-1 w-[140px]'>{classification}</td>
            <td className='p-1 w-[240px]'>{accountdesc}</td>
            <td className='p-1 w-[140px]'>{accountcode}</td>
            <td className='p-1 w-[100px] text-right'>{isEditing? <input type="text" 
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}/>
                    :Number(amount).toLocaleString()}</td>
            <td className='p-1'><button onClick={(e) =>  {isEditing? onEdit():setIsEditing(true)}} className='btn btn-primary btn-sm'>{isEditing?'Update':'Edit'}</button></td>
            {isEditing?<td className='p-1'><button onClick={(e) => onCancel() } className='btn btn-warning btn-sm'>Cancel</button></td>:''}
            {!isEditing?            <td className='p-1'><button onClick={(e) => onRemove(item.id) } className='btn btn-warning btn-sm'>Remove</button></td>:''}

        </tr>
    </>
  )
}

export default AccountItem
