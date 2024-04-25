import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client';

export default function OfficeForApprovalObligationRequestList() {
  const [obrlist,setObrList] = useState([]);
  const navigate = useNavigate();
  const win = window.sessionStorage;
  useEffect(()=>{
    displayOBR();
  },[]);


  const displayOBR = ()=>{
    const officename = win.getItem('officename');
    axiosClient.get(`/obligationrequest/${officename}`).then(res =>{
      // console.log(res.data.obrlist);
      setObrList(res.data.obrlist);
    });
  }
  const onClickPreview = (obrid)=>{
    navigate('/obrpreviewonly',{state:{obrid:obrid,usertype:'APRV'}});
  }
  
  const onClickApprove = (e,obr)=>{
    e.preventDefault();
    const obrid = obr['id'];
  
    axiosClient.get(`/obligationrequest/officeapprove/${obrid}`).then(res =>{
      displayOBR();
      alert(res.data.message);
    })
  }

  const onClickCancel = (e,obr)=>{
    e.preventDefault();
    const obrid = obr['id'];
    axiosClient.get(`/obligationrequest/officecancel/${obrid}`).then(res =>{
      displayOBR();
      alert(res.data.message);
    })
  }


  const forApprovalObr = obrlist.filter((obr)=>obr.obrstatus.toLowerCase()==='for approval');
 
  const approveAll = ()=>{
    const data ={
      'details':forApprovalObr
    }

    axiosClient.post(`/obligationrequest/officeapproveallobr`,data).then(res =>{
      displayOBR();
      alert(res.data.message);
    })
  }

  const handleChange = (e)=>{
    const payee = e;
    axiosClient.get(`/obligationrequest/searchbypayee/${payee}`).then(res =>{
      // console.log(res.data.obrlist);
      setObrList(res.data.obrlist);
    });
  }
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-full overflow-scroll" >
      <div className='flex mb-1 relative'>
        <h3 className="text-gray-700 font-medium">Obligation Request</h3>
        <input type="text" className='p-0 h-8 ml-4 w-[20rem]' onChange={(e)=>handleChange(e.target.value)} />
        <button onClick={approveAll} className='btn btn-primary btn-sm right-0 absolute'>Approve All</button>
      </div>
      <div className="border-x border-gray-200 rounded-sm mt-0 overflow-scroll h-[40rem]">
        <table className='w-full text-gray-700 border-collapse border  border-slate-400'>
          <thead className='sticky top-0 bg-slate-200'>
              <tr>
                <th>Payee</th>
                <th>Office Code</th>
                {/* <th>Responsibility Center</th>
                <th>Office Description</th>
                <th>Particulars</th> */}
                <th className='text-right'>Total Amount</th>
                <th>Status</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
          <tbody>
            {forApprovalObr.map((obr)=>(
              <tr key={obr.id} className='m-0 border hover:bg-slate-100 p-0'> 
                <td className='p-2'>{obr.payee}</td>
                {/* <td className='p-2'>{obr.officecode}</td>
                <td className='p-2'>{obr.officename}</td>
                <td className='p-2'>{obr.officedesc}</td> */}
                <td className='p-2'>{obr.particulars}</td>
                <td className='p-2 text-right'>{Number(obr.totalamount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className='p-2'>{obr.obrstatus}</td>
                <td className='p-2'><a href="#" onClick={(e) => onClickApprove(e,{id:obr.id})}>{obr.obrstatus==='For Approval' && 'Approve'}</a></td>
                <td className='p-2'><a href="#" onClick={(e) => onClickPreview(obr.id)}>Print Preview</a></td>
                
              </tr>
            ))}

          </tbody>
        </table>
        
      </div>
    </div>
  )
}
