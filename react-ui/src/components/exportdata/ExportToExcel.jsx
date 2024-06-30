import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axiosClient from '../../axios-client';



const ExportToExcel = () => {

    const currentyr = new Date().getFullYear();
    const endyr= 2023;
    const years=[];

    for (let yr=currentyr;yr>=endyr;yr--){
      years.push(yr);
    }

    const [selectedYear, setSelectedYear] = useState('');

    const handleChange = (event) => {
      setSelectedYear(event.target.value);
    };


    const exportToExcel = () => {

      if(selectedYear !=''){
        axiosClient.get(`/obrtoexcel/${selectedYear}`).then(res =>{
          if(res.data.obrlist.length>0){
            const worksheet = XLSX.utils.json_to_sheet(res.data.obrlist);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        
            // Buffer to store the generated Excel file
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            const filename = "Obligation Request - " + selectedYear + ".xlsx";
            saveAs(blob, filename);
          }else{
            alert('No record found');
          }
        });

       

        
       
       
         
      }else{
        alert("Select Year");
      }

      
    };

    

  return (
    <div className='flex'>
      <select onChange={handleChange} className='w-[150px] mr-2 h-8 p-0 px-1'>
        <option value=''>Select Year</option>
        {years.map((year,index) =>(
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button onClick={exportToExcel} className='btn btn-primary btn-sm'>Export as Excel</button>
    </div>
  )
}

export default ExportToExcel
