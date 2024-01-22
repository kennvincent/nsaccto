import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


export default function OBRList() {

  const [obrlist,setObrList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    displayOBR();
  },[]);


  const displayOBR = ()=>{
    axios.get(`http://127.0.0.1:8000/api/obligationrequest`).then(res =>{
      // console.log(res.data.obrlist);
      setObrList(res.data.obrlist);
    });
  }
  const onClickPreview = (e,obr)=>{
    e.preventDefault();
    window.localStorage.setItem('obr_id',obr['id']);
    navigate('/obrprintpreview');
  }
  
  const onClickApprove = (e,obr)=>{
    e.preventDefault();
    const obrid = obr['id'];
  
    axios.get(`http://127.0.0.1:8000/api/obligationrequest/officeapprove/${obrid}`).then(res =>{
      displayOBR();
      alert(res.data.message);
    })
  }

  const onClickCancel = (e,obr)=>{
    e.preventDefault();
    const obrid = obr['id'];
    axios.get(`http://127.0.0.1:8000/api/obligationrequest/officecancel/${obrid}`).then(res =>{
      displayOBR();
      alert(res.data.message);
    })
  }
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div>
        <h3 className="text-gray-700 font-medium">Obligation Request</h3>
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
                <th>Total Amount</th>
                <th>Status</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
          <tbody>
            {obrlist.map((obr)=>(
              <tr key={obr.id} className='m-0 border hover:bg-slate-100 p-0'> 
                <td className='p-2'>{obr.payee}</td>
                {/* <td className='p-2'>{obr.officecode}</td>
                <td className='p-2'>{obr.officename}</td>
                <td className='p-2'>{obr.officedesc}</td> */}
                <td className='p-2'>{obr.particulars}</td>
                <td className='p-2'>{obr.totalamount}</td>
                <td className='p-2'>{obr.obrstatus}</td>
                <td className='p-2'><a href="#" onClick={(e) => onClickApprove(e,{id:obr.id})}>{obr.obrstatus==='For Approval' && 'Approve'}</a></td>
                <td className='p-2'><a href="#" onClick={(e) => onClickCancel(e,{id:obr.id})}>{obr.obrstatus==='For Approval' && 'Cancel'}</a></td>
                <td className='p-2'><a href="#" onClick={(e) => onClickPreview(e,{id:obr.id})}>Print Preview</a></td>
                
              </tr>
            ))}

          </tbody>
        </table>
        
      </div>
    </div>


  )
}
