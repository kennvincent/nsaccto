import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';

const BudgetAugmentation = () => {
    const [offices,setOffices]=useState([]);
    const [officename,setOfficeName]=useState('');
    const [fy,setFY] =useState('');
    const [lgu,setLGU] =useState('');
    const [ordinanceno,setOrdinanceNo] =useState('');
    const [dated,setDated] =useState('');
    const [augmentationno,setAugmentationNo] =useState('');
    const [budgetfrom,setBudgetFrom]=useState([]);

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
        axiosClient.get(`/displayofficebudget/${officename}`,).then(res=>{
            setBudgetFrom(res.data.budgets);
        });
    }

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
            'userid':userid
        }

        console.log(data);
        
        axiosClient.post(`budgetaugmentation/save`,data).then(res=>{
            alert(res.data.augmentationid);

        });
    }
  return (
    <div className='card w-[60rem] m-auto'>
      <div className='card-header'><h6>Budget Augmentation</h6></div>
      <div className='card-body'>
            <table>
                <tr >
                    <td className='p-1'>FY</td>
                    <td className='p-1  '><input type="text" onChange={(e)=>handleChangeFY(e.target.value)} className='h-8 w-[100px]'/></td>
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

                <tr>
                    <td></td>
                    <td className='p-1'><button onClick={handleSaveAugmentation} className='btn btn-primary btn-sm'>Save</button></td>
                </tr>
            </table>
            
            
      </div>
    </div>
  )
}

export default BudgetAugmentation
