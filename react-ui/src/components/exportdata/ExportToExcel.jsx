import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axiosClient from '../../axios-client';



const ExportToExcel = () => {

    const [obrlist,setObrList] = useState([]);
  
   

   
    const data = [
        { name: "John", email: "john@example.com", age: 28 },
        { name: "Jane", email: "jane@example.com", age: 32 }
    ];

    const exportToExcel = () => {
    
       axiosClient.get(`/obligationrequest/exporttoexcel`).then(res =>{
          // setObrList(res.data.message);
          console.log(res.data);
        });
  
        // const worksheet = XLSX.utils.json_to_sheet(obrlist);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
        // // Buffer to store the generated Excel file
        // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        // const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
        // saveAs(blob, "data.xlsx");
    };

  return (
    <div>
      <button onClick={exportToExcel} className='btn btn-primary btn-sm'>Export as Excel</button>
    </div>
  )
}

export default ExportToExcel
