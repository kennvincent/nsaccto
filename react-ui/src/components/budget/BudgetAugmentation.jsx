import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import BudgetAugmentationAdd from './BudgetAugmentationAdd';
import {v4 as uuid} from 'uuid';
import { useNavigate } from 'react-router-dom';
import SelectAccount from './SelectAccount';

const BudgetAugmentation = () => {
    const [offices,setOffices]=useState([]);
    const [officename,setOfficeName]=useState('');
    const [fy,setFY] =useState('');
    const [lgu,setLGU] =useState('');
    const [ordinanceno,setOrdinanceNo] =useState('');
    const [dated,setDated] =useState('');
    const [augmentationno,setAugmentationNo] =useState('');
    const [accounts,setAccounts]=useState([]);
    const [details,setDetails] = useState([]);

    const [budgetIdFrom,setBudgetIdFrom]=useState('');
    const [accountFrom,setAccountFrom]=useState('');
    const [classFrom,setClassFrom]=useState('');
    const [amountFrom,setAmountFrom]=useState('');

    const [budgetIdTo,setBudgetIdTo] = useState('');
    const [accountTo,setAccountTo]=useState('');
    const [classTo,setClassTo]=useState('');
    const [amountTo,setAmountTo]=useState('');
    const [officecodefrom,setOfficeCodeFrom] = useState('');
    const [officecodeto,setOfficeCodeTo] = useState('');

    const [showAdd,setShowAdd] = useState(false);

    const win = window.sessionStorage;
    var userid = win.getItem('userid');

    useEffect(()=>{
        axiosClient.get(`/offices`).then(res=>{
            setOffices(res.data.offices);
        });
    },[]);
    
    const officesList = offices.map((office)=>{
        return(
            <option value={office.officename} key={office.id}>{office.officename.toUpperCase()}</option>
        );
    })

    const handleChangeOffice = (e)=>{
        setOfficeName(e)
        // axiosClient.get(`/displayofficebudget/${officename}`,).then(res=>{
        //     setAccounts(res.data.budgets);
        // });

        // setDetails([]);
    }

    const accountsList = accounts.map((account)=>{
        return(
            <option key={account.id}>{account.accountcode}</option>
        );
    });


    const handleChangeFY = (e)=>{
        setFY(e);
    }

    const handleChangeLGU = (e)=>{
        setLGU(e);
    }

    const handleChangeOrdinanceNo =(e)=>{
        setOrdinanceNo(e);
    }

    const handleChangeDated =(e)=>{
        setDated(e);
    }

    const handleChangeAugmentationNo = (e)=>{
        setAugmentationNo(e);
    }

    const handleSaveAugmentation = ()=>{
        if(officename==''){
            alert('Select Office');
            return;
        }

        if(fy==''){
            alert('Enter FY');
            return;
        }

        if(lgu==''){
            alert('Enter Local Government Unit');
            return;
        }

        if(ordinanceno==''){
            alert('Enter Ordinance number');
            return;
        }

        if(dated==''){
            alert('Enter Date');
            return;
        }

        if(augmentationno==''){
            alert('Enter Number');
            return;
        }

        const data = {
            'officename':officename,
            'fy':fy,
            'lgu':lgu,
            'ordinanceno':ordinanceno,
            'dated':dated,
            'augmentationno':augmentationno,
            'userid':userid,
            'details': details


        }
        
        axiosClient.post(`budgetaugmentation/save`,data).then(res=>{
            if(res.data.augmentationid>0){
                alert('Augmentation have been saved');
            }
            // console.log(res.data.details);

        });
    }

    const handleShowAdd=()=>{
        setShowAdd(true);
    }

    const handleCloseAdd=()=>{
        setShowAdd(false);
    }

    const handleAccountFrom = (e)=>{
        setAccountFrom(e.target.value)
    }

    const handleClassFrom = (e)=>{
        setClassFrom(e.target.value)
    }

    const handleAmountFrom = (e)=>{
        setAmountFrom(e.target.value)
        setAmountTo(e.target.value)
    }

    const handleAccountTo = (e)=>{
        setAccountTo(e.target.value);
    }

    const handleClassTo = (e)=>{
        setClassTo(e.target.value);
    }

    const handleAmountTo = (e)=>{
        setAmountFrom(e.target.value)
        setAmountTo(e.target.value);
    }

    const handleAddDetail = ()=>{
        if(accountFrom==''){
            alert('Enter Object of Expenditures from');
            return;
        }

        if(classFrom==''){
            alert('Enter Expense Class from');
            return;
        }

        if(amountFrom==''){
            alert('Enter Amount from');
            return;
        }

        if(accountTo==''){
            alert('Enter Object of Expenditures to');
            return;
        }

        if(classTo==''){
            alert('Enter Expense Class to');
            return;
        }

        if(amountTo==''){
            alert('Enter Amount to');
            return;
        }

        if(accountFrom==accountTo){
            alert('Sources of fund and Uses of funds must not be the same account');
            return;
        }
        const amountFromCleaned = amountFrom.replace(/,/g, '');
        const amountToCleaned = amountTo.replace(/,/g, '');

        const newItem = {id: uuid(),
                         budgetIdFrom:budgetIdFrom,
                         accountFrom:accountFrom,
                         classFrom:classFrom,
                         amountFrom:amountFromCleaned,
                         budgetIdTo:budgetIdTo,
                         accountTo:accountTo,
                         classTo:classTo,
                         amountTo:amountToCleaned,
                         officecodefrom:officecodefrom,
                         officecodeto:officecodeto
                    };
       
        
        setDetails([...details,newItem]);
        setBudgetIdFrom('');
        setAccountFrom('');
        setClassFrom('');
        setAmountFrom('');
        setBudgetIdTo('');
        setAccountTo('');
        setClassTo('');
        setAmountTo('');
        setOfficeCodeFrom('');
        setOfficeCodeTo('');
    }

    const handleRemove = (id)=>{
       const updateDetails = details.filter(detail => detail.id !== id);
       setDetails(updateDetails);
    }
    
    const detailsList = details.map((detail)=>{
        const cleanedAmountFrom = detail.amountFrom.replace(/,/g, '')
        const cleanedAmountTo = detail.amountTo.replace(/,/g, '')
        return(
            <tr key={detail.id}>
            <td className='p-1 border border-gray-300 w-[150px]'>{detail.accountFrom}</td>
            <td className='p-1 border border-gray-300 w-[150px]'>{detail.classFrom}</td>
            <td className='p-1 border border-gray-300 w-[150px] text-right'>{Number(cleanedAmountFrom).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td className='p-1 border border-gray-300 w-[150px]'>{detail.officecodefrom}</td>

            <td className='p-1 border border-gray-300 w-[150px]'>{detail.accountTo}</td>
            <td className='p-1 border border-gray-300 w-[150px]'>{detail.classTo}</td>
            <td className='p-1 border border-gray-300 w-[150px] text-right'>{Number(cleanedAmountTo).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td className='p-1 border border-gray-300 w-[150px]'>{detail.officecodeto}</td>
            <td className='p-1 border border-gray-300 w-[50px]'><a href="#" onClick={(e)=>handleRemove(detail.id)} >remove</a></td>

        </tr>
        );
       
    })

    
    const navigate = useNavigate();
    const handleClose = ()=>{
        navigate('/dashboard');
    }

    const handleViewList = ()=>{
        navigate('/budgetaugmentationlist');
    }

    
    const [objectexpenditures,setObjectExpenditures] = useState('');
    const [showAccountFrom,setShowAccountFrom] =useState(false);
    const [budgetFrom,setBudgetFrom]=useState([]);

    const handleSelectAccountFrom = (selected)=>{
        setObjectExpenditures(selected);
      

        if(officename==''){
            alert('Select Office');
            return;
        }
       


        if(fy==''){
            alert('Enter FY');
            return;
        }

        
        axiosClient.get(`/budgetaugmentation/objectexpenditures/${officename}/${fy}`).then(res=>{
            setBudgetFrom(res.data.budgets);
            setShowAccountFrom(true);
        });

        
    }

    const handleHideAccountFrom = ()=>{
        setShowAccountFrom(false);
    }
    const handleSelectAccountTo = ()=>{

    }

    const handleCloseOnSelect=(data)=>{
        
        setShowAccountFrom(false);
        if(objectexpenditures=="from"){
            setBudgetIdFrom(data.budgetid);
            setAccountFrom(data.accountcode);
            setOfficeCodeFrom(data.officecode);
        }else if(objectexpenditures=="to"){
            setBudgetIdTo(data.budgetid);
            setAccountTo(data.accountcode);
            setOfficeCodeTo(data.officecode);
        }
        
    }
  return (
    <div className='card w-[85rem] m-auto'>
      <div className='card-header'><h6>Budget Augmentation</h6></div>
      <div className='card-body'>
            <table>
                <tr >
                    <td className='p-1'>FY</td>
                    <td className='p-1  '><input type="text"  onChange={(e)=>handleChangeFY(e.target.value)} className='h-8 w-[100px]'/></td>
                    <td className='w-[100px]'></td>
                    <td className='p-1'>Ordinance No.</td>
                    <td className='p-1'><input type="text" onChange={(e)=>handleChangeOrdinanceNo(e.target.value)} className='h-8'/></td>
                </tr>
                <tr >
                    <td className='p-1'>Local Government Unit</td>
                    <td className='p-1  '><input type="text" onChange={(e)=>handleChangeLGU(e.target.value)} className='h-8 w-[400px]'/></td>
                    <td className='w-[100px]'></td>
                    <td className='p-1'>Dated</td>
                    <td className='p-1'><input type="text" onChange={(e)=>handleChangeDated(e.target.value)} className='h-8'/></td>
                </tr>
                <tr >
                    <td className='p-1'>Office</td>
                    <td className='p-1  '>
                        <select onChange={(e)=>handleChangeOffice(e.target.value)} name="" id="" className='h-8 p-0 px-1 w-[400px]' >
                            <option value={''}>Select Office</option>
                            {officesList}
                        </select>
                    </td>
                    <td className='w-[100px]'></td>
                    <td className='p-1'>No.</td>
                    <td className='p-1  '><input type="text" onChange={(e)=>handleChangeAugmentationNo(e.target.value)} className='h-8'/></td>
                    
                </tr>

                
               
            </table>
            
            <table className='border-collapse border border-gray-300 mt-4'>
                    <tr>
                        <td colspan="4" className='border border-gray-300 text-center'>Sources of funds</td>
                        <td colspan="4" className='border border-gray-300 text-center'>Uses of funds</td>
                    </tr>
                    <tr>
                        <td className='p-1 border border-gray-300 text-center'>Object of Expenditures</td>
                        <td className='p-1 border border-gray-300 text-center'>Expense Class</td>
                        <td className='p-1 border border-gray-300'>Amount</td>
                        <td className='p-1 border border-gray-300'>Office Code</td>

                        <td className='p-1 border border-gray-300 text-center'>Object of Expenditures</td>
                        <td className='p-1 border border-gray-300 text-center'>Expense Class</td>
                        <td className='p-1 border border-gray-300 text-center'>Amount</td>
                        <td className='p-1 border border-gray-300'>Office Code</td>
                    </tr>
                    <tr>
                        <td className='p-1 border border-gray-300 text-center'><input type="text" value={accountFrom}  className=' h-8 w-[150px]'/></td>
                        <td className='p-1 border border-gray-300 text-center'><input type="text" value={classFrom} onChange={(e)=>handleClassFrom(e)} className=' h-8 w-[150px]'/></td>
                        <td className='p-1 border border-gray-300 text-center'><input type="text" value={amountFrom} onChange={(e)=>handleAmountFrom(e)} className=' h-8 w-[150px]'/></td>
                        <td className='p-1 border border-gray-300 text-center'><input type="text" value={officecodefrom}  className=' h-8 w-[150px]'/></td>

                        <td className='p-1 border border-gray-300 text-center'><input type="text" value={accountTo}  className=' h-8 w-[150px]'/></td>
                        <td className='p-1 border border-gray-300 text-center'><input type="text" value={classTo} onChange={(e)=>handleClassTo(e)} className=' h-8 w-[150px]'/></td>
                        <td className='p-1 border border-gray-300 text-center'><input type="text" value={amountTo} onChange={(e)=>handleAmountTo(e)} className=' h-8 w-[150px]'/></td>
                        <td className='p-1 border border-gray-300 text-center'><input type="text" value={officecodeto}  className=' h-8 w-[150px]'/></td>
                    </tr>
                    <tr>
                        <td className='p-1 border border-gray-300 w-[150px] text-center'><a href="#" onClick={()=>handleSelectAccountFrom('from')}>Select Account</a></td>
                        <td className='p-1 border border-gray-300 w-[150px]'></td>
                        <td className='p-1 border border-gray-300 w-[150px]'></td>
                        <td className='p-1 border border-gray-300 w-[150px]'></td>
                        <td className='p-1 border border-gray-300 w-[150px] text-center'><a href="#" onClick={()=>handleSelectAccountFrom('to')}>Select Account</a></td>
                        <td className='p-1 border border-gray-300 w-[150px]'></td>
                        <td className='p-1 border border-gray-300 w-[150px]'></td>
                        <td className='p-1 border border-gray-300 w-[150px]'></td>
                    </tr>
                   
                   
                </table>

                <div className='p-1'>
                    <button className='btn btn-primary btn-sm w-[150px]' onClick={handleAddDetail}>Add</button>
                        
                </div>
                <div className='max-h-[200px] overflow-y-scroll p-1'> 
                    <table className='border-collapse border border-gray-300 mt-4'>
                       
                        {detailsList}
                    </table>
                </div>

                <div className='p-1 mt-6'>
                    <button onClick={handleSaveAugmentation} className='btn btn-primary btn-sm w-[150px] mr-2'>Save</button>
                    <button onClick={handleViewList} className='btn btn-primary btn-sm w-[150px] mr-4'>View List</button>
                    <button onClick={handleClose} className='btn btn-primary btn-sm w-[150px]'>Close</button>
                
                </div>
      </div>
        <SelectAccount visible={showAccountFrom} dataBudgetFrom={budgetFrom} onClose={handleHideAccountFrom} onCloseSelect={handleCloseOnSelect}/>
    </div>
  )
}

export default BudgetAugmentation
