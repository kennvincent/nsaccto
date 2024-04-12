import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client'
import LoadOfficesDropDown from '../shared/LoadOfficesDropDown';

const OBRRejectedList = () => {
    const[obrlist,setObrList] = useState([]);
    const [officename,setOfficeName]=useState();

    useEffect(()=>{
        axiosClient.get(`obligationrequest/budgetview/rejectedobr`).then(res =>{
            setObrList(res.data.obrlist);
        });
    },[]);
   

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

      const onChangeOffice= (office)=>{
        setOfficeName(office);
      }

  return (
    <div className='bg-white'>
        <h5>Rejected Obligation Request</h5>
        <LoadOfficesDropDown onChangeOffice={onChangeOffice}/>
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

export default OBRRejectedList
