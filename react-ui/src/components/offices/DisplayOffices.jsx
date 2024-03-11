import React from 'react'
import { useEffect,useState} from 'react'
import axiosClient from '../../axios-client';
import { tr } from 'date-fns/locale';

export default function DisplayOffices() {
    const [offices,setOffices] =useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient('/budget/view');
        
        // const result = await response.json();
        
        setOffices(response.data.budgets);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

    var officeLIst = offices.map((office)=>{
        return(
            <tr>
                <td>{office.officecode}</td>
                <td>{office.officename}</td>
                <td>{office.officedesc}</td>
            </tr>
        )
    })

   
  return (
    <div>
       
        <table>
            <thead>
                <tr>
                    <th>Office Code</th>
                    <th>Office Name</th>
                    <th>Office Desc</th>
                </tr>
            </thead>
            <tbody>
                {officeLIst}
            </tbody>
        </table>

    </div>
  )
}
