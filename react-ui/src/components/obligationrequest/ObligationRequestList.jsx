import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function OBRList() {

  const [obrlist,setObrList] = useState([]);

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/obligationrequest`).then(res =>{
      // console.log(res.data.obrlist);
      setObrList(res.data.obrlist);
    });
  },[]);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div>
        <h3 className="text-gray-700 font-medium">Obligation Request</h3>
      </div>
      <div className="border-x border-gray-200 rounded-sm mt-0 overflow-scroll h-[40rem]">
        <table className='w-full text-gray-700 border-collapse border  border-slate-400'>
          <thead className='sticky top-0 bg-slate-200'>
              <th>Payee</th>
              <th>Office Code</th>
              <th>Responsibility Center</th>
              <th>Office Description</th>
              <th>Particulars</th>
              <th>Status</th>
            </thead>
          <tbody>
            {obrlist.map((obr)=>(
              <tr key={obr.id} className='m-0 border hover:bg-slate-100 p-0'> 
                <td className='p-2'>{obr.payee}</td>
                <td className='p-2'>{obr.officecode}</td>
                <td className='p-2'>{obr.officename}</td>
                <td className='p-2'>{obr.officedesc}</td>
                <td className='p-2'>{obr.particulars}</td>
                <td className='p-2'>{obr.obrstatus}</td>
              </tr>
            ))}

          </tbody>
        </table>
        
      </div>
    </div>


  )
}
