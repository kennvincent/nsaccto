import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client';

export default function OfficeApprovedObligationRequest() {
  const [obrlist,setObrList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    // displayOBR();
    axiosClient.get(`/obligationrequest/viewall/officeapproved`).then(res =>{
      // console.log(res.data.obrlist);
      setObrList(res.data.obrlist);
    });
  },[]);


  // const displayOBR = ()=>{
  //   const officename = window.localStorage.getItem('officename');
  //   axiosClient.get(`/obligationrequest/${officename}`).then(res =>{
  //     // console.log(res.data.obrlist);
  //     setObrList(res.data.obrlist);
      
  //   });
  // }


  const onClickPreview = (e,obr)=>{
    e.preventDefault();
    navigate('/obrpreviewonly',{state:{obrid:obr['id']}});
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

  const handleChange = (e)=>{
    const payee = e;
    axiosClient.get(`/obligationrequest/searchbypayee/${payee}`).then(res =>{
      // console.log(res.data.obrlist);
      setObrList(res.data.obrlist);
    });
  }
  const approvedOBR = obrlist.filter((obr) =>obr.obrstatus.toLowerCase() =='approved');
  console.log(approvedOBR);
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className='flex'>
        <h3 className="text-gray-700 font-medium">Obligation Request</h3>
        <input type="text" className='p-0 h-8 ml-4 w-[20rem]' onChange={(e)=>handleChange(e.target.value)} />
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
            {approvedOBR.map((obr)=>(
              <tr key={obr.id} className='m-0 border hover:bg-slate-100 p-0'> 
                <td className='p-2'>{obr.payee}</td>
                {/* <td className='p-2'>{obr.officecode}</td>
                <td className='p-2'>{obr.officename}</td>
                <td className='p-2'>{obr.officedesc}</td> */}
                <td className='p-2'>{obr.particulars}</td>
                <td className='p-2 text-right'>{Number(obr.totalamount).toLocaleString()}</td>
                <td className='p-2'>{obr.obrstatus}</td>
                <td className='p-2'><a href="#" onClick={(e) => onClickPreview(e,{id:obr.id})}>Print Preview</a></td>
                
              </tr>
            ))}

          </tbody>
        </table>
        
      </div>
    </div>
  )
}
