import React from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



const ExportToExcel = () => {

    
    const data = [
        { name: "John", email: "john@example.com", age: 28 },
        { name: "Jane", email: "jane@example.com", age: 32 }
    ];

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
        saveAs(blob, "data.xlsx");
    };

  return (
    <div>
      <button onClick={exportToExcel}>Export as Excel</button>
    </div>
  )
}

export default ExportToExcel
