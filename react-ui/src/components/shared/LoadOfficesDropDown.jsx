import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';

export default function LoadOfficesDropDown() {
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
          <option value={office.id} key={office.id}>{office.officename}</option>
        );
      });
  return (
    <div>
        <select className='p-1 w-[20rem]' >
            <option value="" ></option>
            {loadOffices}
        </select>
    </div>
  )
}
