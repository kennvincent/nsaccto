import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client';


export default function OBRList() {

  const [obrlist,setObrList] = useState([]);
  const navigate = useNavigate();
  const win = window.sessionStorage;
  const [officename,setOfficeName]=useState();
  useEffect(()=>{
    setOfficeName(win.getItem('officename'));

    displayOBR();
  },[]);


  const displayOBR = ()=>{
    let ofc=win.getItem('officename');
    axiosClient.get(`/obligationrequest/${ofc}`).then(res =>{
      // console.log(res.data.obrlist);
      setObrList(res.data.obrlist);
     
    });
  }
  const onClickPreview = (obrid)=>{
    win.setItem('obrid',obrid);
    win.setItem('usertype','USR');
    
    // navigate('/obrpreviewonly');
    navigate('/obrpreviewonly',{state:{obrid:obrid,usertype:'USR'}});
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
    const obrid = obr['id'];
    const data = {
      'obrid':obrid
    }
    axiosClient.put(`/obligationrequest/officecancel/`,data).then(res =>{
      displayOBR();
      alert(res.data.message);
    })
  }

  const onClickEdit = (obrid)=>{
    win.setItem('obrid',obrid)
    navigate('/obredit');
  }
  
  const onClickClose = ()=>{
    navigate("/dashboard");
  }

  const onHandleOnChangePayee = (payee)=>{
    if(payee != ''){
      const data = {
        'officename':officename,
        'payee':payee
      }
      
    
      axiosClient.post(`/obligationrequest/searchbypayee`,data).then(res =>{
        setObrList(res.data.obrlist);
      });
    }else{
      displayOBR();
    }
  }

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className='flex'>
        <h4 className="text-gray-700 font-medium">{officename}: Obligation Request</h4>
        <input type="text" className='w-[300px] h-8 ml-4' onChange={(e)=>onHandleOnChangePayee(e.target.value)} />
      </div>
      <div className="border-x border-gray-200 rounded-sm mt-0 overflow-scroll h-[40rem]">
        <table className='w-full text-gray-700 border-collapse border  border-slate-400'>
          <thead className='sticky top-0 bg-slate-200'>
              <tr>
                <th>Payee</th>
                <th>Particulars</th>
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
            {obrlist.map((obr)=>(
              <tr key={obr.id} className='m-0 border hover:bg-slate-100 p-0'> 
                <td className='p-2'>{obr.payee}</td>
                {/* <td className='p-2'>{obr.officecode}</td>
                <td className='p-2'>{obr.officename}</td>
                <td className='p-2'>{obr.officedesc}</td> */}
                <td className='p-2'>{obr.particulars}</td>
                <td className='p-2 text-right'>{Number(obr.totalamount).toLocaleString()}</td>
                <td className='p-2'>{obr.obrstatus}</td>
                <td className='p-2 w-[50px]'><a href="#" onClick={(e) => onClickCancel(e,{id:obr.id})}>Cancel</a></td>
                <td className='p-2 w-[50px]'><a href="#" onClick={(e) => onClickEdit(obr.id)}>{(obr.obrstat==='1' || obr.obrstat==='2') && 'Edit' }</a></td> 
                <td className='p-2'><a href="#" onClick={(e) => onClickPreview(obr.id)}>Print Preview</a></td>
                {/* <td className='p-2'><a href="#" onClick={(e) => onClickPreview(e,{id:obr.id})}>Print Preview</a></td> */}
                
              </tr>
            ))}

          </tbody>
        </table>
        
      </div>
      <div className='relative'>
        <button onClick={onClickClose} className='btn btn-primary mt-2 w-full md:w-[150px]  right-0'>Close</button>
      </div>
        
    </div>


  )
}
