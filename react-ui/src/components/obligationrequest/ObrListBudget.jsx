import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import LoadOfficesDropDown from '../shared/LoadOfficesDropDown';

export default function ObrListBudget() {
    const [obrlist,setObrList] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{

      axiosClient.get(`/obligationrequest/budget/forapprovalobr/view`).then(res =>{
        setObrList(res.data.obrlist);
      });

    },[]);
 
    
    const handleShowOBR = (obrid)=>{
      navigate("/showobrbudget",{state:{obrid:obrid}});
    }
    

    const obrall = obrlist.map((obr)=>{
      return(
        <tr key={obr.id} className='p-0 m-0 border hover:bg-slate-100'> 
          <td className='py-1'>{obr.payee}</td>
          <td className='py-1'>{obr.officecode}</td>
          <td className='py-1'>{obr.officename}</td>
          <td className='py-1'>{obr.officedesc}</td>
          <td className='py-1'>{obr.particulars}</td>
          <td className='py-1 text-right'>{Number(obr.totalamount).toLocaleString()}</td>
          <td className='py-1'><button className='btn btn-success btn-sm' onClick={()=>handleShowOBR(obr.id)}>View</button></td>
        </tr>
      )
    })

    const onChangeOffice = (officename)=>{
      if(officename.trim().length==0){
        axiosClient.get(`/obligationrequest/budget/forapprovalobr/view`).then(res =>{
          setObrList(res.data.obrlist);
        });
      }else{
        axiosClient.get(`/obligationrequest/budget/forapprovalobr/office/${officename}`).then(res =>{
          setObrList(res.data.obrlist);
        });
      }

      

    }
    
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div>
        <h3 className="text-gray-700 font-medium">Obligation Requests</h3>
      </div>
      <div className='flex'>
        <LoadOfficesDropDown onChangeOffice={onChangeOffice} />
      </div>
      
      <div className="border-x border-gray-200 rounded-sm mt-0 overflow-scroll h-[40rem]">
        <table className='w-full text-gray-700 border-collapse  border-slate-400 border mt-2'>
          <thead className='sticky top-0 bg-slate-200'>
            <tr >
              <th>Payee</th>
              <th>Office Code</th>
              <th>Responsibility Center</th>
              <th>Office Description</th>
              <th>Particulars</th>
              <th>Total Amount</th>
              <th>|||</th>
            </tr>
          </thead>
          <tbody>
            {obrall}
          </tbody>
        </table>
        
      </div>
    </div>
  )
}
