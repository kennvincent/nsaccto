import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';

export default function LoadOfficesDropDown({onChangeOffice}) {
    const [offices,setOffices] = useState([]);

    useEffect(()=>{
        axiosClient.get(`/offices`).then(res=>{
            setOffices(res.data.offices);
          }).catch(function(error){
              console.log("ERROR " + error.response.status);
          });
    },[]);
    

      const loadOffices = offices.map((office)=>{
        return(
          
          <option value={office.officename} key={office.id}>{office.officename}</option>
        );
      });

     
  return (
    <div>
        <select className='p-1 w-[20rem]' onChange={(e)=>onChangeOffice(e.target.value)}>
            <option value="" ></option>
            <option value="All" >All</option>
            {loadOffices}
        </select>
    </div>
  )
}
